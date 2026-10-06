import { type Browser, chromium, type Page } from "playwright-core";
import { env } from "@/lib/env";

export const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

let browser: Browser | null = null;
let connecting: Promise<Browser> | null = null;

export type BrowserMode = "cloudflare" | "local" | "browserless" | "lightpanda";

export async function getBrowser(mode?: BrowserMode): Promise<Browser> {
  const targetMode = mode || env.BROWSER_TYPE;

  // Auto-detect: prefer lightpanda kalo token ada
  if (!targetMode && process.env.LPD_TOKEN) {
    return getBrowser("lightpanda");
  }

  if (browser?.isConnected()) return browser;
  if (!connecting) {
    connecting = (async () => {
      if (targetMode === "lightpanda") {
        if (!process.env.LPD_TOKEN) {
          throw new Error(
            "LPD_TOKEN wajib diisi untuk Lightpanda Cloud",
          );
        }
        browser = await chromium.connectOverCDP(
          `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}`,
          { timeout: 10_000 },
        );
        return browser;
      }

      if (targetMode === "local") {
        browser = await chromium.launch({ headless: true });
        return browser;
      }

      if (targetMode === "cloudflare") {
        if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_API_TOKEN) {
          throw new Error(
            "CLOUDFLARE_ACCOUNT_ID dan CLOUDFLARE_API_TOKEN wajib diisi untuk Cloudflare Browser Rendering",
          );
        }
        const endpoint = `wss://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000`;
        browser = await chromium.connectOverCDP(endpoint, {
          timeout: 10_000,
          headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
        });
        return browser;
      }

      if (targetMode === "browserless" || env.BROWSER_WS_ENDPOINT) {
        const endpoint = env.BROWSER_WS_ENDPOINT || "ws://localhost:3002";
        browser = await chromium.connectOverCDP(endpoint, { timeout: 10_000 });
        return browser;
      }

      // Default strategy: Try Cloudflare if configured, fallback to local chromium
      if (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_API_TOKEN) {
        const endpoint = `wss://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000`;
        try {
          browser = await chromium.connectOverCDP(endpoint, {
            timeout: 5_000,
            headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
          });
          return browser;
        } catch (err) {
          console.warn("Cloudflare CDP failed, falling back to local chromium:", String(err));
        }
      }

      browser = await chromium.launch({ headless: true });
      return browser;
    })().finally(() => {
      connecting = null;
    });
  }
  return connecting;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close().catch(() => {});
    browser = null;
  }
}

export async function newPage(mode?: BrowserMode): Promise<Page> {
  let b = await getBrowser(mode);

  // Lightpanda hanya support 1 browser context — tutup yg sebelumnya
  const contexts = b.contexts();
  for (const ctx of contexts) {
    await ctx.close().catch(() => {});
  }

  // Kalo context sebelumnya udah di-close, browser mati — reconnect
  if (!b.isConnected()) {
    browser = null;
    connecting = null;
    b = await getBrowser(mode);
  }

  const context = await b.newContext({
    locale: "id-ID",
    userAgent: BROWSER_UA,
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });
  return context.newPage();
}

export async function navigate(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page
    .waitForLoadState("networkidle", { timeout: 1_000 })
    .catch(() => { });
}
