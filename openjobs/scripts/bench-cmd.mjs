import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const cloudWs = process.env.LPD_TOKEN ? `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}` : '';
const hostedWs = 'ws://43.134.15.94:9222';

const JOBS = [
  { id: "pintarnya-1", url: "https://pintarnya.com/lowongan/logistic-admin-1080768", source: "Pintarnya" },
  { id: "toploker-1", url: "https://toploker.com/lowongan/2025-04-15!desk-collection1994!di!pt-colmitra-persada-indonesia-2025-04-15", source: "Toploker" },
  { id: "kitalulus-1", url: "https://id.kitalulus.com/lowongan/detail/seri-iv-misi-seru-freelance-wfh-dapatkan-reward-10-v4fb", source: "KitaLulus" },
  { id: "karircom-1", url: "https://karir.com/", source: "Karir.com" },
  { id: "glints-1", url: "https://glints.com/", source: "Glints" },
  { id: "jobstreet-1", url: "https://id.jobstreet.com/id/job/94972691?type=standard&ref=search-standalone#sol=9064b78c98bc35d276b3a803428a5ef4b503ff08", source: "JobStreet" },
  { id: "indeed-1", url: "https://id.indeed.com/viewjob?jk=52e1e86935aa3983", source: "Indeed" },
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
      console.log(`[OK] ${j.id}: hosted=${h.total}ms cloud=${c.total}ms diff=${c.total-h.total}ms`);
    } catch (e) {
      res.push({ id: j.id, source: j.source, error: 'ERR' });
      console.error(`[ERR] ${j.id}`);
    }
  }
  let md = '# Perbandingan Lightpanda Hosted vs Cloud\n\n';
  md += '| Job ID | Source | Hosted (ms) | Cloud (ms) | Δ (ms) |\n';
  md += '|---|---|---|---|---|\n';
  for (const r of res) {
    if (r.error) md += `| ${r.id} | ${r.source} | ERR | ERR | - |\n`;
    else md += `| ${r.id} | ${r.source} | ${r.hosted_ms} | ${r.cloud_ms} | ${r.diff_ms} |\n`;
  }
  writeFileSync('browser-latency-report.md', md);
  console.log('\nSaved: browser-latency-report.md');
}

main().catch(e=>{ console.error('ERR'); process.exit(1); });
