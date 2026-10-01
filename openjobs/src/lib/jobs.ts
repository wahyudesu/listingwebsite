export type PreviewMode = "iframe" | "proxy";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  source: string;
  mode: PreviewMode;
  url: string;
}

const SOURCES: Record<string, { name: string; mode: PreviewMode }> = {
  jobstreet: { name: "JobStreet", mode: "proxy" },
  pintarnya: { name: "Pintarnya", mode: "iframe" },
  toploker: { name: "Toploker", mode: "iframe" },
  indeed: { name: "Indeed", mode: "proxy" },
  kitalulus: { name: "KitaLulus", mode: "iframe" },
  hiredtoday: { name: "HiredToday", mode: "proxy" },
  linkedin: { name: "LinkedIn", mode: "proxy" },
  karircom: { name: "Karir.com", mode: "iframe" },
  getredy: { name: "GetRedy", mode: "iframe" },
  glints: { name: "Glints", mode: "proxy" },
  lokerid: { name: "Loker.id", mode: "proxy" },
  dealls: { name: "Dealls", mode: "proxy" },
  kalibrr: { name: "Kalibrr", mode: "proxy" },
};

export const SOURCE_SITES: { name: string; url: string; mode: PreviewMode }[] =
  [
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

export const JOBS: Job[] = [
  // ── GROUP 1 ──────────────────────────────────────────────────────────────

  // JobStreet
  {
    id: "jobstreet-1",
    title: "Native English Teacher",
    location: "Jakarta Raya",
    company: "Nuansa Edukasi Indonesia",
    source: SOURCES.jobstreet.name,
    mode: SOURCES.jobstreet.mode,
    url: "https://id.jobstreet.com/id/job/92988773?type=standard&ref=search-standalone&origin=cardTitle",
  },
  {
    id: "jobstreet-2",
    title: "Koordinator Gudang",
    location: "Jakarta Utara, Jakarta Raya",
    company: "PT Lancar Inti Nusantara",
    source: SOURCES.jobstreet.name,
    mode: SOURCES.jobstreet.mode,
    url: "https://id.jobstreet.com/id/job/93215089?type=standard&ref=search-standalone&origin=cardTitle",
  },
  {
    id: "jobstreet-3",
    title: "Production Team Leader",
    location: "Cikarang Selatan, Jawa Barat",
    company: "PT CFU Technology Indonesia",
    source: SOURCES.jobstreet.name,
    mode: SOURCES.jobstreet.mode,
    url: "https://id.jobstreet.com/id/job/93504064?type=standard&ref=search-standalone&origin=cardTitle",
  },

  // Pintarnya
  {
    id: "pintarnya-1",
    title: "Logistic Admin Intern",
    location: "Kota Adm. Jakarta Selatan, DKI Jakarta",
    company: "Mitra Premium Pintarnya",
    source: SOURCES.pintarnya.name,
    mode: SOURCES.pintarnya.mode,
    url: "https://pintarnya.com/lowongan/logistic-admin-1080768",
  },
  {
    id: "pintarnya-2",
    title: "Customer Service Digital",
    location: "Kota Adm. Jakarta Selatan, DKI Jakarta",
    company: "Mitra Premium Pintarnya",
    source: SOURCES.pintarnya.name,
    mode: SOURCES.pintarnya.mode,
    url: "https://pintarnya.com/lowongan/customer-service-1089284",
  },
  {
    id: "pintarnya-3",
    title: "Social Media Officer",
    location: "Kota Adm. Jakarta Selatan, DKI Jakarta",
    company: "Mitra Premium Pintarnya",
    source: SOURCES.pintarnya.name,
    mode: SOURCES.pintarnya.mode,
    url: "https://pintarnya.com/lowongan/social-media-1089314",
  },

  // Toploker
  {
    id: "toploker-1",
    title: "Desk Collection",
    location: "Lokasi tidak ditampilkan",
    company: "PT Colmitra Persada Indonesia",
    source: SOURCES.toploker.name,
    mode: SOURCES.toploker.mode,
    url: "https://toploker.com/lowongan/2025-04-15!desk-collection1994!di!pt-colmitra-persada-indonesia-2025-04-15",
  },
  {
    id: "toploker-2",
    title: "Marketing",
    location: "Lokasi tidak ditampilkan",
    company: "PT Arull Onshop",
    source: SOURCES.toploker.name,
    mode: SOURCES.toploker.mode,
    url: "https://toploker.com/lowongan/2026-07-04!marketing!di!pt-arull-onshop-2026-06-27",
  },
  {
    id: "toploker-3",
    title: "Business Partner",
    location: "Lokasi tidak ditampilkan",
    company: "PT Amartha Mikro Fintek",
    source: SOURCES.toploker.name,
    mode: SOURCES.toploker.mode,
    url: "https://toploker.com/lowongan/2026-05-08!business-partner-631!di!pt-amartha-mikro-fintek",
  },

  // ── GROUP 2 ──────────────────────────────────────────────────────────────

  // Indeed
  {
    id: "indeed-1",
    title: "On-Site Quality Assurance Technician (Indonesia)",
    location: "Jakarta",
    company: "Lululemon",
    source: SOURCES.indeed.name,
    mode: SOURCES.indeed.mode,
    url: "https://id.indeed.com/viewjob?jk=52e1e86935aa3983",
  },
  {
    id: "indeed-2",
    title: "Community Development-Indonesia",
    location: "Indonesia",
    company: "Perusahaan tidak ditampilkan",
    source: SOURCES.indeed.name,
    mode: SOURCES.indeed.mode,
    url: "https://id.indeed.com/viewjob?jk=ad4436d29f6a3db5",
  },
  {
    id: "indeed-3",
    title: "Consultant, Strategic Initiatives - Indonesia",
    location: "Jakarta",
    company: "IIX Global",
    source: SOURCES.indeed.name,
    mode: SOURCES.indeed.mode,
    url: "https://id.indeed.com/viewjob?jk=4d42ce9bb1ae0b46",
  },

  // KitaLulus
  {
    id: "kitalulus-1",
    title:
      "Gabung Freelance Online Admin WFH Dapat Uang Jajan Tanpa KTP 10.000-60.0000 -DL",
    location: "Jakarta Timur, DKI Jakarta",
    company: "Misi Seru - KitaLulus",
    source: SOURCES.kitalulus.name,
    mode: SOURCES.kitalulus.mode,
    url: "https://id.kitalulus.com/lowongan/detail/seri-iv-misi-seru-freelance-wfh-dapatkan-reward-10-v4fb",
  },
  {
    id: "kitalulus-2",
    title: "Staff Account Receivable (Finance)",
    location: "Kabupaten Bogor, Jawa Barat",
    company: "PT Sigma Bimed",
    source: SOURCES.kitalulus.name,
    mode: SOURCES.kitalulus.mode,
    url: "https://id.kitalulus.com/lowongan/detail/admin-finance-ar-qee8",
  },
  {
    id: "kitalulus-3",
    title: "Gardener",
    location: "Kabupaten Badung, Bali",
    company: "PT Kayu Mebel Indonesia",
    source: SOURCES.kitalulus.name,
    mode: SOURCES.kitalulus.mode,
    url: "https://id.kitalulus.com/lowongan/detail/gardener-4jd9",
  },

  // HiredToday
  {
    id: "hiredtoday-1",
    title: "Staff Advertiser FNB",
    location: "Surakarta, Jawa Tengah",
    company: "Abata Donuts & Coffee",
    source: SOURCES.hiredtoday.name,
    mode: SOURCES.hiredtoday.mode,
    url: "https://www.hiredtoday.com/id/jobs/cities/central-java/18077-surakarta/",
  },
  {
    id: "hiredtoday-2",
    title: "Baker",
    location: "Surakarta, Jawa Tengah",
    company: "Abata Donuts & Coffee",
    source: SOURCES.hiredtoday.name,
    mode: SOURCES.hiredtoday.mode,
    url: "https://www.hiredtoday.com/id/jobs/cities/central-java/18077-surakarta/",
  },
  {
    id: "hiredtoday-3",
    title: "Crew Outlet",
    location: "Surakarta, Jawa Tengah",
    company: "Abata Donuts & Coffee",
    source: SOURCES.hiredtoday.name,
    mode: SOURCES.hiredtoday.mode,
    url: "https://www.hiredtoday.com/id/jobs/cities/central-java/18077-surakarta/",
  },

  // ── GROUP 3 ──────────────────────────────────────────────────────────────

  // LinkedIn
  {
    id: "linkedin-1",
    title: "Spontaneous application",
    location: "Yaur, Papua, Indonesia",
    company: "Praim",
    source: SOURCES.linkedin.name,
    mode: SOURCES.linkedin.mode,
    url: "https://id.linkedin.com/jobs/view/spontaneous-application-at-praim-4450394098",
  },
  {
    id: "linkedin-2",
    title: "Can't find the perfect position?",
    location: "Yaur, Papua, Indonesia",
    company: "Dev-Heroes",
    source: SOURCES.linkedin.name,
    mode: SOURCES.linkedin.mode,
    url: "https://id.linkedin.com/jobs/view/can%C2%B4t-find-the-perfect-position%3F-at-dev-heroes-4449128854",
  },
  {
    id: "linkedin-3",
    title: "How to use Rows",
    location: "Yaur, Papua, Indonesia",
    company: "QAILT",
    source: SOURCES.linkedin.name,
    mode: SOURCES.linkedin.mode,
    url: "https://id.linkedin.com/jobs/view/how-to-use-rows-at-qailt-4453117107",
  },

  // Karir.com
  {
    id: "karircom-1",
    title: "Office Boy",
    location: "Prov. DKI-Jakarta",
    company: "PT Bina Talenta",
    source: SOURCES.karircom.name,
    mode: SOURCES.karircom.mode,
    url: "https://karir.com/opportunities/1401396",
  },
  {
    id: "karircom-2",
    title: "Baker",
    location: "Jakarta Utara",
    company: "PT KOOMA BOGA INDONESIA",
    source: SOURCES.karircom.name,
    mode: SOURCES.karircom.mode,
    url: "https://karir.com/search-lowongan?query=Baker",
  },
  {
    id: "karircom-3",
    title: "Admin Trade Service Counter Perbankan",
    location: "Prov. DKI-Jakarta",
    company: "PT Bina Talenta",
    source: SOURCES.karircom.name,
    mode: SOURCES.karircom.mode,
    url: "https://karir.com/opportunities/1401363",
  },

  // GetRedy
  {
    id: "getredy-1",
    title: "Account Executive",
    location: "Lokasi tidak ditampilkan",
    company: "PT EKA MAS REPUBLIK",
    source: SOURCES.getredy.name,
    mode: SOURCES.getredy.mode,
    url: "https://www.getredy.id/",
  },
  {
    id: "getredy-2",
    title: "Community Officer",
    location: "Lokasi tidak ditampilkan",
    company: "BTPN SYARIAH",
    source: SOURCES.getredy.name,
    mode: SOURCES.getredy.mode,
    url: "https://www.getredy.id/",
  },
  {
    id: "getredy-3",
    title: "Customer Service",
    location: "Lokasi tidak ditampilkan",
    company: "PT EKA MAS REPUBLIK",
    source: SOURCES.getredy.name,
    mode: SOURCES.getredy.mode,
    url: "https://www.getredy.id/lowongan/1",
  },

  // ── GROUP 4 ──────────────────────────────────────────────────────────────

  // Glints
  {
    id: "glints-1",
    title: "[Part-time] - Pengajar Bahasa Inggris - Praya",
    location: "Jakarta Pusat, DKI Jakarta",
    company: "Ruangguru",
    source: SOURCES.glints.name,
    mode: SOURCES.glints.mode,
    url: "https://glints.com/id/opportunities/jobs/part-time-pengajar-bahasa-inggris-praya/8ad3b753-f5ed-454c-8a74-990b07a49ddd",
  },
  {
    id: "glints-2",
    title: "[Part-time] - Pengajar Bahasa Inggris - Bima",
    location: "Jakarta Pusat, DKI Jakarta",
    company: "Ruangguru",
    source: SOURCES.glints.name,
    mode: SOURCES.glints.mode,
    url: "https://glints.com/id/opportunities/jobs/part-time-pengajar-bahasa-inggris-bima/f2367260-f5ad-49cc-93e9-00d4da9f4590",
  },
  {
    id: "glints-3",
    title: "INTERNSHIP - DIGITAL MEDIA (JAKARTA)",
    location: "Jakarta Pusat, DKI Jakarta",
    company: "PT Summarecon Agung Tbk",
    source: SOURCES.glints.name,
    mode: SOURCES.glints.mode,
    url: "https://glints.com/id/opportunities/jobs/internship-digital-media-jakarta/3759d067-5bf9-4b2d-82bd-9cbad4fd0f81",
  },

  // Loker.id
  {
    id: "lokerid-1",
    title: "Guru Bahasa Mandarin",
    location: "Surabaya",
    company: "Yixi Mandarin Learning Center",
    source: SOURCES.lokerid.name,
    mode: SOURCES.lokerid.mode,
    url: "https://www.loker.id/cari-lowongan-kerja?jobid=15892988",
  },
  {
    id: "lokerid-2",
    title: "Graphic Designer Social Media",
    location: "Jakarta Utara",
    company: "PT.NANO SNG",
    source: SOURCES.lokerid.name,
    mode: SOURCES.lokerid.mode,
    url: "https://www.loker.id/cari-lowongan-kerja?jobid=15892983",
  },
  {
    id: "lokerid-3",
    title: "Helper Sample Team (Daily Worker)",
    location: "Jakarta Barat",
    company: "PT HANA FASHION INDONESIA",
    source: SOURCES.lokerid.name,
    mode: SOURCES.lokerid.mode,
    url: "https://www.loker.id/cari-lowongan-kerja?jobid=15892959",
  },

  // ── GROUP 5 ──────────────────────────────────────────────────────────────

  // Dealls
  {
    id: "dealls-1",
    title: "IT Sales Specialist",
    location: "Jakarta Selatan",
    company: "Optima Daya Solusi",
    source: SOURCES.dealls.name,
    mode: SOURCES.dealls.mode,
    url: "https://dealls.com/loker/it-sales-specialist~optimadayasolusicom",
  },
  {
    id: "dealls-2",
    title: "Sales & Strategy Intern",
    location: "Tangerang Regency",
    company: "Segari",
    source: SOURCES.dealls.name,
    mode: SOURCES.dealls.mode,
    url: "https://dealls.com/loker/sales-and-strategy-intern-2~segari",
  },
  {
    id: "dealls-3",
    title: "Warehouse Supervisor",
    location: "Tangerang Regency",
    company: "Segari",
    source: SOURCES.dealls.name,
    mode: SOURCES.dealls.mode,
    url: "https://dealls.com/loker/warehouse-supervisor-15~segari",
  },

  // Kalibrr
  {
    id: "kalibrr-1",
    title: "Senior Mechanic",
    location: "Bengkalis, Indonesia",
    company: "PT Berkat Karimar Mandiri (BKM)",
    source: SOURCES.kalibrr.name,
    mode: SOURCES.kalibrr.mode,
    url: "https://www.kalibrr.id/c/pt-berkat-karimar-mandiri-bkm/jobs",
  },
  {
    id: "kalibrr-2",
    title: "Fullstack Java Developer",
    location: "Central Jakarta, Indonesia",
    company: "PT Prismalink International",
    source: SOURCES.kalibrr.name,
    mode: SOURCES.kalibrr.mode,
    url: "https://www.kalibrr.id/c/pt-prismalink-international/jobs",
  },
  {
    id: "kalibrr-3",
    title: "Accounting and Tax Manager",
    location: "Bandar Lampung, Indonesia",
    company: "PT Agung Putra Niaga Mandiri",
    source: SOURCES.kalibrr.name,
    mode: SOURCES.kalibrr.mode,
    url: "https://www.kalibrr.id/c/pt-agung-putra-niaga-mandiri/jobs",
  },
];

export function searchJobs(query: string): Job[] {
  const q = query.trim().toLowerCase();
  if (!q) return JOBS;
  return JOBS.filter((job) =>
    [job.title, job.company, job.location, job.source]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function findJob(id: string): Job | undefined {
  return JOBS.find((job) => job.id === id);
}
