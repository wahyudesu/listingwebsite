<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# openjobs — Agent Guide

Aggregator lowongan kerja dengan preview situs sumber via iframe. Bukan screenshot.

## Tech Stack

- **Next.js 16.3.1** + **vinext 1.0.0-beta** (dual build: standalone & Cloudflare Workers)
- **Runtime/Package manager**: bun 1.3.14
- **UI**: React 19.2.8, Tailwind v4, shadcn/ui
- **Browser engine**: playwright-core 1.62 (headless Chromium) via Lightpanda Cloud, Cloudflare Browser Rendering, browserless, atau local
- **Deployment**: Cloudflare Workers via vinext-cloudflare + wrangler
- **CI/CD**: GitHub Actions
- **Linter/Formatter**: Biome 2.4 (bukan Prettier)
- **E2E**: Playwright test

## Aturan mutlak

### 1. Preview = iframe, BUKAN screenshot
- Jangan pernah ubah `/api/preview` atau `/api/proxy` jadi return gambar.
- Preview adalah **iframe** yang render HTML asli situs — baik langsung (`mode: "iframe"`) maupun via proxy headless browser (`mode: "proxy"`).
- `proxyErrorPage` di `src/lib/proxy-html.ts` emang ada `<img>` dari `/api/preview` sebagai fallback — itu cuma halaman error, bukan alur utama. Jangan jadikan itu fokus.
- Kalau Lightpanda gak support format screenshot tertentu, **biarin aja**. Itu fallback, bukan prioritas.

### 2. API routes — wajib force-dynamic
- SEMUA route yang pake browser (proxy, preview) HARUS:
  ```ts
  export const dynamic = "force-dynamic";
  export const maxDuration = 60;
  ```
- Tanpa `force-dynamic`, Next.js App Router bisa cache response static dan browser gak jalan.

### 3. Bersihin context browser
- Wajib `page.context().close()` di `finally` block setelah selesai pake page. Jangan bocorin context.

### 4. Dua file browser.ts — jangan tertukar
- `src/lib/browser.ts` — yang dipake: pake `playwright-core`, connect ke Lightpanda/Cloudflare/local/browserless via CDP.
- `lib/browser.ts` (root) — kemungkinan legacy.
- Mode browser: `lightpanda` (default), `cloudflare`, `local`, `browserless`. Diatur via env `BROWSER_TYPE`.

### 5. Env vars
- `.env` cuma berisi `LPD_TOKEN`. Env var lain diatur dari luar: GitHub Secrets, docker-compose, shell.
- Var yang dipake:
  - `LPD_TOKEN` — token Lightpanda Cloud
  - `BROWSER_TYPE` — `lightpanda` | `cloudflare` | `local` | `browserless` (optional)
  - `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` — Cloudflare Browser Rendering
  - `BROWSER_WS_ENDPOINT` — browserless

### 6. Dual build system
- `bun run dev` — Next.js standalone (port 3000)
- `bun run dev:vinext` — vinext (port 3001)
- `bun run build` — Next.js standalone
- `bun run build:vinext` — build untuk Cloudflare Workers
- `bun run deploy:vinext` — deploy ke Cloudflare

### 7. Preview mode logic
- `mode: "iframe"` — iframe langsung ke situs sumber (pintarnya, toploker, kitalulus, karircom, getredy)
- `mode: "proxy"` — iframe ke `/api/proxy` yang render via headless browser, ambil HTML, sanitasi, kirim HTML ke iframe
- Fallback: iframe gagal 5s → proxy. Proxy gagal 15s → error page dengan retry & open tab baru
- Jangan nambah mode baru tanpa alasan jelas

### 8. can-iframe API
- Deteksi `X-Frame-Options` dan `CSP frame-ancestors` via HEAD request (fallback ke GET)
- `KNOWN_ALLOWED_HOSTS` dan `DENY_FRAME_HOSTS` hardcoded — cek dulu baru probe
- Cache 1 jam per hostname di client

### 9. Source sites — jangan asal edit
- `DATA.md` dan `src/lib/jobs.ts` harus sinkron. Mode (`iframe`/`proxy`) udah ditetapkan per source.

### 10. Package manager = bun
- `bun add`, `bun remove`, `bun install`
- Kalo nambah shadcn component: `npx shadcn add [component]`

### 11. Format & lint
- `bun run format` — Biome
- `bun run lint` — Biome (ui components di-skip)
- Jangan pake Prettier

### 12. Cloudflare bindings
- Di server: `import { env } from "cloudflare:workers"`
- Jangan pake `getPlatformProxy()` atau custom worker entry

## Jebakan umum

1. **Next.js 16 — beda.** Baca docs di `node_modules/next/dist/docs/` sebelum nulis kode.
2. **Biome overrides** — `src/components/ui/**` punya quoteStyle single + asNeeded semicolons + linter disable. Kalo nambah file di situ, format manual.
3. **Docker compose** — butuh `browserless/chrome` container. Set `BROWSER_WS_ENDPOINT`.
4. **Proxy HTML terbatas** — `sanitizeProxiedHtml()` cuma rewrite `<a>` dan inject `<base>`. Script, CSS, gambar dari origin asli. Bisa broken kena CORS/anti-bot.
5. **Playwright test** — pake Lightpanda, butuh `LPD_TOKEN` di `.env`. Jangan ubah config ini tanpa mastiin token jalan.
6. **AGENTS.md file ini** — yang asli di root, bukan isian. Isinya aturan main proyek + boilerplate Next.js di atas. Jangan remove boilerplate — dia auto-generated sama `next dev`.

## Test
- `bun test` (jalanin playwright test)
- Butuh `LPD_TOKEN` di `.env` + server jalan (`bun run dev`)
- Satu test: API `/api/preview` return 200 (fallback screenshot — bukan prioritas kalo format gak didukung Lightpanda)