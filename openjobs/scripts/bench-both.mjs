import { chromium } from 'playwright-core';

const cloudWs = process.env.LPD_TOKEN ? `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}` : '';
const hostedWs = 'ws://127.0.0.1:9222';
const urls = [
  'https://pintarnya.com/',
  'https://toploker.com/',
  'https://id.kitalulus.com/',
  'https://karir.com/',
  'https://glints.com/',
];

async function run(ws, url) {
  const t0 = Date.now();
  const browser = await chromium.connectOverCDP(ws, { timeout: 60000 });
  const t1 = Date.now();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const t2 = Date.now();
  await page.goto(url, { timeout: 120000 });
  const t3 = Date.now();
  await ctx.close();
  await browser.close();
  return { connect: t1-t0, goto: t3-t2, total: t3-t0 };
}

async function main() {
  const res = [];
  for (const url of urls) {
    const h = await run(hostedWs, url);
    const c = await run(cloudWs, url);
    res.push({ url: url.substring(0, 40), hosted_ms: h.total, cloud_ms: c.total, diff_ms: c.total - h.total });
  }
  console.table(res);
}

main().catch(e=>{ console.error('ERR'); });
