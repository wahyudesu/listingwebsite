import { chromium, type Browser, type Page } from "playwright-core";
import { env } from "@prototype/env/web";

export const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

let browser: Browser | null = null;
let connecting: Promise<Browser> | null = null;

function browserWsEndpoint(): string {
  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_API_TOKEN) {
    throw new Error(
      "CLOUDFLARE_ACCOUNT_ID dan CLOUDFLARE_API_TOKEN wajib diisi untuk Cloudflare Browser Run",
    );
  }
  return `wss://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000`;
}

async function getBrowser(): Promise<Browser> {
  if (browser?.isConnected()) return browser;
  if (!connecting) {
    connecting = chromium
      .connectOverCDP(browserWsEndpoint(), {
        timeout: 55_000,
        headers: {
          Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        },
      })
      .then((b) => {
        browser = b;
        return b;
      })
      .finally(() => {
        connecting = null;
      });
  }
  return connecting;
}

export async function newPage(): Promise<Page> {
  const b = await getBrowser();
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
  await page.waitForLoadState("networkidle", { timeout: 1_500 }).catch(() => {});
  await page.waitForTimeout(500);
}