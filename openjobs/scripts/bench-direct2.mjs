import { chromium } from 'playwright-core';

const cloudWs = process.env.LPD_TOKEN ? `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}` : '';
const url = 'https://pintarnya.com/';

async function run(ws) {
  const t0 = Date.now();
  const browser = await chromium.connectOverCDP(ws, { timeout: 30000 });
  const t1 = Date.now();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const t2 = Date.now();
  await page.goto(url, { timeout: 60000 });
  const t3 = Date.now();
  await ctx.close();
  await browser.close();
  console.log({ connect: t1-t0, newpage: t2-t1, goto: t3-t2, total: t3-t0 });
}

run(cloudWs).catch(e=>console.error('ERR'));
