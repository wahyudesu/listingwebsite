import { navigate, withPage } from "@/lib/browser";
import { proxyErrorPage, sanitizeProxiedHtml } from "@/lib/proxy-html";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CACHE_TTL = 60 * 60 * 1000;
const CACHE_TTL_SECONDS = 3600;
const RENDER_TIMEOUT = 20_000;

const memoryCache = new Map<string, { html: string; at: number }>();
const inflight = new Map<string, Promise<string>>();

interface SharedCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}

function getSharedCache(): SharedCache | null {
  const caches = (globalThis as { caches?: { default?: SharedCache } }).caches;
  return caches?.default ?? null;
}

function cacheKey(url: string, origin: string): Request {
  return new Request(`${origin}/api/proxy?url=${encodeURIComponent(url)}`);
}

function htmlResponse(html: string): Response {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    },
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then((v) => {
        clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

async function readCache(url: string, origin: string): Promise<string | null> {
  const memory = memoryCache.get(url);
  if (memory && Date.now() - memory.at < CACHE_TTL) return memory.html;

  const shared = getSharedCache();
  if (shared) {
    try {
      const cached = await shared.match(cacheKey(url, origin));
      if (cached) {
        const html = await cached.text();
        memoryCache.set(url, { html, at: Date.now() });
        return html;
      }
    } catch {
      // cache baca gagal — lanjut render
    }
  }
  return null;
}

async function writeCache(
  url: string,
  origin: string,
  html: string,
): Promise<void> {
  memoryCache.set(url, { html, at: Date.now() });

  const shared = getSharedCache();
  if (shared) {
    try {
      await shared.put(cacheKey(url, origin), htmlResponse(html));
    } catch {
      // cache tulis gagal — abaikan
    }
  }
}

// Dedupe request bersamaan untuk URL yang sama agar browser cuma render sekali.
function renderOnce(
  url: string,
  target: URL,
  proxyOrigin: string,
): Promise<string> {
  const pending = inflight.get(url);
  if (pending) return pending;

  const run = withTimeout(
    renderPage(url, target, proxyOrigin),
    RENDER_TIMEOUT,
  ).finally(() => {
    inflight.delete(url);
  });
  inflight.set(url, run);
  return run;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get("url");
  const proxyOrigin = requestUrl.origin;

  if (!url) {
    return Response.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return Response.json({ error: "Invalid url" }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol)) {
    return Response.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  const cached = await readCache(url, proxyOrigin);
  if (cached) return htmlResponse(cached);

  try {
    const html = await renderOnce(url, target, proxyOrigin);
    await writeCache(url, proxyOrigin, html);
    return htmlResponse(html);
  } catch (error) {
    console.error("Proxy render failed:", error);
    return new Response(proxyErrorPage(url, proxyOrigin), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}

async function renderPage(url: string, target: URL, proxyOrigin: string) {
  return withPage(async (page) => {
    await navigate(page, url);
    const rawHtml = await page.content();
    return sanitizeProxiedHtml(rawHtml, target, proxyOrigin);
  });
}
