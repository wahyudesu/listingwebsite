import { navigate, newPage } from "@/lib/browser";
import { proxyErrorPage, sanitizeProxiedHtml } from "@/lib/proxy-html";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map<string, { html: string; at: number }>();

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

  const cached = cache.get(url);
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return new Response(cached.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const page = await newPage();
  try {
    await navigate(page, url);

    const rawHtml = await page.content();
    const html = sanitizeProxiedHtml(rawHtml, target, proxyOrigin);
    cache.set(url, { html, at: Date.now() });

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Proxy render failed:", error);
    return new Response(proxyErrorPage(url, proxyOrigin), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } finally {
    await page.context().close().catch(() => {});
  }
}