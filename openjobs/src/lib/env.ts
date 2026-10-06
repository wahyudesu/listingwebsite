const env = {
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
  BROWSER_WS_ENDPOINT: process.env.BROWSER_WS_ENDPOINT,
  BROWSER_TYPE: process.env.BROWSER_TYPE as "cloudflare" | "local" | "browserless" | "lightpanda" | undefined,
} as const;

export { env };

