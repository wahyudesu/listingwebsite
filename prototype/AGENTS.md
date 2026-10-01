# Project Overview

**JobSearch** — prototipe agregator lowongan kerja Indonesia.  
Pengguna bisa mencari lowongan dari puluhan situs sekaligus dalam satu tempat.

## Stack

- **Framework:** Next.js (App Router) — `apps/web`
- **Monorepo:** Turborepo + Bun
- **UI:** Tailwind CSS + shadcn/ui (`packages/ui`)
- **Data:** static array di `apps/web/src/lib/jobs.ts` (sementara, sebelum pindah ke NoSQL)

## Struktur Halaman

| Route | Deskripsi |
|---|---|
| `/` | Halaman pencarian — search input di tengah, mirip Google |
| `/search?q=...` | Hasil pencarian — dua kolom: daftar lowongan (kiri) + preview website (kanan) |

## Data

- **39 lowongan** dari **13 sumber** aktif, diambil 19 Agustus 2026
- Field tiap entri: `id`, `title`, `company`, `location`, `source`, `url`
- Detail lengkap ada di `DATA.txt`

### Sumber Website & Status iframe

| # | Nama | URL | iframe | Alasan |
|---|---|---|---|---|
| 1 | JobStreet | https://id.jobstreet.com/ | ❌ | `X-Frame-Options: SAMEORIGIN` + Cloudflare bot block |
| 2 | Pintarnya | https://pintarnya.com/ | ✅ | Tidak ada header pembatas |
| 3 | Toploker | https://toploker.com/ | ✅ | Tidak ada header pembatas |
| 4 | Indeed | https://id.indeed.com/ | ❌ | `X-Frame-Options: SAMEORIGIN` + Cloudflare bot block |
| 5 | KitaLulus | https://kitalulus.com/ | ✅ | Tidak ada header pembatas |
| 6 | HiredToday | https://www.hiredtoday.com/ | ❌ | `X-Frame-Options: SAMEORIGIN` |
| 7 | LinkedIn | https://www.linkedin.com/ | ❌ | `X-Frame-Options: SAMEORIGIN` + CSP `frame-ancestors` hanya subdomain LinkedIn |
| 8 | Karir.com | https://karir.com/ | ✅ | Tidak ada header pembatas |
| 9 | GetRedy | https://www.getredy.id/ | ✅ | Tidak ada header pembatas |
| 10 | Glints | https://glints.com/id/ | ❌ | `X-Frame-Options: SAMEORIGIN` |
| 11 | Loker.id | https://www.loker.id/ | ❌ | `X-Frame-Options: SAMEORIGIN` + Cloudflare bot block |
| 12 | Dealls | https://dealls.com/ | ❌ | `X-Frame-Options: SAMEORIGIN` + CSP `frame-ancestors 'self' *.dealls.com` |
| 13 | Kalibrr | https://www.kalibrr.id/ | ❌ | `X-Frame-Options: SAMEORIGIN` + CSP whitelist domain lain |

> KarirHub Kemnaker (https://karirhub.kemnaker.go.id/) belum dimasukkan — data publik tidak terverifikasi.

#### Rekomendasi untuk job-preview.tsx

- **✅ Bisa langsung iframe (5 situs):** Pintarnya, Toploker, KitaLulus, Karir.com, GetRedy
- **❌ Perlu buka tab baru / `window.open` (8 situs):** JobStreet, Indeed, HiredToday, LinkedIn, Glints, Loker.id, Dealls, Kalibrr

Untuk situs yang tidak bisa di-iframe, tampilkan tombol **"Buka di Tab Baru"** sebagai fallback di panel kanan, bukan iframe kosong.

## File Penting

| File | Fungsi |
|---|---|
| `apps/web/src/lib/jobs.ts` | Data & fungsi `searchJobs`, `findJob` |
| `apps/web/src/components/job-explorer.tsx` | Komponen daftar hasil pencarian |
| `apps/web/src/components/job-preview.tsx` | Komponen preview website (iframe kanan) |
| `apps/web/src/components/search-bar.tsx` | Input pencarian |
| `DATA.txt` | Raw data scraping (referensi) |
