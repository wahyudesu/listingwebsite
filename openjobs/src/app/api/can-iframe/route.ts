export const dynamic = "force-dynamic";

const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Situs yang header-nya "jujur" (tanpa X-Frame-Options/CSP) tapi tetap memblokir
// embed lewat mekanisme lain (mis. Cloudflare menolak iframe). Dicantumkan manual.
const DENY_FRAME_HOSTS = ["glints.com"];

function deniedHost(hostname: string): string | null {
  const h = hostname.replace(/^www\./, "").toLowerCase();
  for (const d of DENY_FRAME_HOSTS) {
    if (h === d || h.endsWith(`.${d}`)) return d;
  }
  return null;
}

function cspBlocksFraming(header: string): boolean {
  const frameAncestors = /frame-ancestors\s+([^;]+)/i.exec(header)?.[1];
  if (!frameAncestors) return false;
  return frameAncestors
    .trim()
    .split(/\s+/)
    .some((t) => t === "'none'" || t === "'self'" || t.startsWith("http"));
}

function headerBlockReason(headers: Headers): string | null {
  const xfo = headers.get("x-frame-options");
  if (xfo && /deny|sameorigin/i.test(xfo)) return `x-frame-options: ${xfo}`;

  const csp = headers.get("content-security-policy");
  if (csp && cspBlocksFraming(csp)) return "csp frame-ancestors";

  return null;
}

async function probe(
  target: string,
  method: "HEAD" | "GET",
): Promise<Response | null> {
  try {
    return await fetch(target, {
      method,
      redirect: "follow",
      headers: { "user-agent": BROWSER_UA },
    });
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) {
    return Response.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return Response.json({ allowed: false, reason: "url tidak valid" });
  }
  if (!["http:", "https:"].includes(target.protocol)) {
    return Response.json({ allowed: false, reason: "protocol tidak didukung" });
  }

  const host = deniedHost(target.hostname);
  if (host) {
    return Response.json({ allowed: false, reason: `denylist: ${host}` });
  }

  // HEAD dulu; kalau gagal/tanpa info, cek lewat GET (beberapa server tidak
  // mengirim X-Frame-Options/CSP pada HEAD).
  let resp = await probe(target.href, "HEAD");
  if (!resp || !resp.ok) {
    resp = await probe(target.href, "GET");
  }

  if (!resp) {
    return Response.json({ allowed: false, reason: "fetch gagal" });
  }

  const reason = headerBlockReason(resp.headers);
  return Response.json(
    reason
      ? { allowed: false, reason }
      : { allowed: true, reason: "header bersih" },
  );
}
