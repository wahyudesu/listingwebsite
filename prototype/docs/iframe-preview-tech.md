# Embed Job-Listing Preview (iframe + headless fallback)

Cara membuat preview website lowongan yang bisa di-embed di iframe, walau situsnya memblokir embed.

## Alur

```
klik job → /api/can-iframe?url=... → { allowed, reason }
  allowed → <iframe src="https://situs...">          (langsung, instan)
  blocked → <iframe src="/api/proxy?url=...">        (render headless + cache)
```

Fallback ekstra: iframe langsung yang nyangkut >12 detik otomatis pindah ke proxy.

## Deteksi (`/api/can-iframe`)

1. HEAD request (fallback GET) ke target
2. `X-Frame-Options: deny|sameorigin` → blokir
3. CSP `frame-ancestors 'none'|'self'|http...` → blokir
4. Denylist manual hanya untuk situs yang header-nya bersih tapi tetap diblokir (Glints via Cloudflare)

## Proxy (`/api/proxy`)

- Render halaman dengan **Playwright + headless Chromium** (stealth: UA Chrome, `webdriver` dihapus)
- Sanitasi HTML: buang meta CSP, `<script>`, event handler `on*`
- Suntik `<base href="target">` (biar CSS/gambar jalan) + rewrite link same-origin ke `/api/proxy`
- Sajikan `text/html` dari origin kita → iframe tak mungkin diblokir (origin berbeda dari situs asli)
- Cache in-memory per URL (TTL 10 menit) → kunjungan kedua instan (~6ms)

## Deploy (PENTING)

- Playwright butuh binary Chromium: `npx playwright install --with-deps chromium`
- Sudah pakai `--no-sandbox --disable-dev-shm-usage` (cocok VPS/container)
- Paling cocok di **Node panjang / VPS / Railway / Fly / Render** (`next start`)
- Vercel serverless: lambat (cold start + boot browser); tidak disarankan

## File kunci

- `apps/web/src/app/api/can-iframe/route.ts` — deteksi
- `apps/web/src/app/api/proxy/route.ts` — render + sanitize + cache
- `apps/web/src/app/api/preview/route.ts` — screenshot fallback
- `apps/web/src/lib/browser.ts` — setup Playwright bersama
- `apps/web/src/lib/proxy-html.ts` — sanitizer/rewriter HTML
- `apps/web/src/components/job-preview.tsx` — komponen UI (mode checking/iframe/proxy)
