import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const cloudWs = process.env.LPD_TOKEN ? `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}` : '';
const hostedWs = 'ws://127.0.0.1:9222';

const JOBS = [
  { id: "pintarnya-1", source: "Pintarnya", url: "https://pintarnya.com/lowongan/logistic-admin-1080768" },
  { id: "toploker-1", source: "Toploker", url: "https://toploker.com/lowongan/2025-04-15!desk-collection1994!di!pt-colmitra-persada-indonesia-2025-04-15" },
  { id: "kitalulus-1", source: "KitaLulus", url: "https://id.kitalulus.com/lowongan/detail/seri-iv-misi-seru-freelance-wfh-dapatkan-reward-10-v4fb" },
  { id: "karircom-1", source: "Karir.com", url: "https://karir.com/" },
  { id: "glints-1", source: "Glints", url: "https://glints.com/" },
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
  for (const j of JOBS) {
    try {
      const h = await run(hostedWs, j.url);
      const c = await run(cloudWs, j.url);
      res.push({ id: j.id, source: j.source, hosted_ms: h.total, cloud_ms: c.total, diff_ms: c.total - h.total });
    } catch (e) {
      res.push({ id: j.id, source: j.source, error: 'ERR' });
    }
  }
  console.table(res);
  let md = '| Job ID | Source | Hosted (ms) | Cloud (ms) | Δ (ms) |\n|---|---|---|---|---|\n';
  for (const r of res) {
    if (r.error) md += `| ${r.id} | ${r.source} | ERR | ERR | - |\n`;
    else md += `| ${r.id} | ${r.source} | ${r.hosted_ms} | ${r.cloud_ms} | ${r.diff_ms} |\n`;
  }
  writeFileSync('browser-latency-perjob.md', md);
  console.log('Saved: browser-latency-perjob.md');
}

main();
