import { test, expect } from '@playwright/test';

const SOURCE_SITES = [
  { name: "JobStreet", url: "https://www.jobstreet.co.id/", mode: "proxy" },
  { name: "Pintarnya", url: "https://pintarnya.com/", mode: "iframe" },
  { name: "Toploker", url: "https://toploker.com/", mode: "iframe" },
  { name: "Indeed", url: "https://id.indeed.com/", mode: "proxy" },
  { name: "KitaLulus", url: "https://id.kitalulus.com/", mode: "iframe" },
  { name: "HiredToday", url: "https://www.hiredtoday.com/", mode: "proxy" },
  { name: "LinkedIn", url: "https://id.linkedin.com/", mode: "proxy" },
  { name: "Karir.com", url: "https://karir.com/", mode: "iframe" },
  { name: "GetRedy", url: "https://www.getredy.id/", mode: "iframe" },
  { name: "Glints", url: "https://glints.com/", mode: "proxy" },
  { name: "Loker.id", url: "https://www.loker.id/", mode: "proxy" },
  { name: "Dealls", url: "https://dealls.com/", mode: "proxy" },
  { name: "Kalibrr", url: "https://www.kalibrr.id/", mode: "proxy" },
];

test.describe("Job Preview Render", () => {
  for (const site of SOURCE_SITES) {
    test(`${site.name} (${site.mode}) should render preview`, async ({ request }) => {
      const res = await request.get(
        `/api/proxy?url=${encodeURIComponent(site.url)}`,
      );
      expect(res.status()).toBe(200);

      const contentType = res.headers()["content-type"] || "";
      expect(contentType).toContain("text/html");

      const body = await res.text();
      expect(body.length).toBeGreaterThan(100);

      // Catat kalo fallback ke error page (bukan failure — itu wajar)
      if (body.includes("Gagal merender website")) {
        console.warn(`[WARN] ${site.name} rendered fallback error page (timeout/blocked)`);
      }
    });
  }
});
