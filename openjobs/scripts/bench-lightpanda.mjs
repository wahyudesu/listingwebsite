import { chromium } from 'playwright-core';

const cloudWs = `wss://euwest.cloud.lightpanda.io/ws?token=${process.env.LPD_TOKEN}`;
const hostedWs = 'ws://127.0.0.1:9222';

const urls = [
  'https://pintarnya.com/',
  'https://toploker.com/',
  'https://id.kitalulus.com/',
  'https://karir.com/',
  'https://www.getredy.id/',
  'https://glints.com/',
  'https://www.loker.id/',
  'https://dealls.com/',
];

function ms() { return Date.now(); }

async function measure(wsUrl, url, runs = 3) {
  const runsResult = [];
  for (let i = 1; i <= runs; i++) {
    let browser, context, page;
    const t0 = ms();
    try {
      browser = await chromium.connectOverCDP(wsUrl, { timeout: 15_000 });
      const t1 = ms();
      context = await browser.newContext({ locale: 'id-ID', viewport: { width: 1366, height: 768 } });
      page = await context.newPage();
      const tGotoStart = ms();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      const tGotoEnd = ms();
      const total = ms() - t0;
      runsResult.push({
        run: i,
        connectMs: t1 - t0,
        gotoMs: tGotoEnd - tGotoStart,
        totalMs: total,
      });
    } catch (e) {
      runsResult.push({ run: i, error: String(e) });
    } finally {
      try { if (page) await page.context().close().catch(() => {}); } catch {}
      try { if (browser?.isConnected()) await browser.close().catch(() => {}); } catch {}
    }
  }
  return runsResult;
}

async function avg(arr, key) {
  const v = arr.filter(x => x[key] != null).map(x => x[key]);
  if (!v.length) return null;
  return Math.round(v.reduce((a,b)=>a+b,0)/v.length);
}

async function main() {
  const results = {};
  for (const url of urls) {
    console.log(`\n=== Testing ${url} ===`);
    const hosted = await measure(hostedWs, url, 3);
    console.log('HOSTED (ws://127.0.0.1:9222):', hosted);
    const cloud = await measure(cloudWs, url, 3);
    console.log('CLOUD  (wss://euwest.cloud.lightpanda.io/ws):', cloud);
    results[url] = { hosted, cloud, avgHosted: { connect: avg(hosted,'connectMs'), goto: avg(hosted,'gotoMs'), total: avg(hosted,'totalMs') }, avgCloud: { connect: avg(cloud,'connectMs'), goto: avg(cloud,'gotoMs'), total: avg(cloud,'totalMs') } };
  }
  console.log('\n\n=== SUMMARY TABLE ===');
  console.log('| URL | Hosted total (avg ms) | Cloud total (avg ms) | Hosted goto (avg ms) | Cloud goto (avg ms) | Hosted connect (avg ms) | Cloud connect (avg ms) |');
  console.log('|---|---|---|---|---|---|---|');
  for (const [url, r] of Object.entries(results)) {
    console.log(`| ${url} | ${r.avgHosted.total ?? '-'} | ${r.avgCloud.total ?? '-'} | ${r.avgHosted.goto ?? '-'} | ${r.avgCloud.goto ?? '-'} | ${r.avgHosted.connect ?? '-'} | ${r.avgCloud.connect ?? '-'} |`);
  }
}

main().catch(e => { console.error('ERR', e); process.exit(1); });
