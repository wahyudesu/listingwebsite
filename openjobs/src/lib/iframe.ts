const KNOWN_ALLOWED_HOSTS = new Set([
  "pintarnya.com",
  "toploker.com",
  "kitalulus.com",
  "karir.com",
  "getredy.id",
]);

const KNOWN_DENIED_HOSTS = new Set([
  "jobstreet.com",
  "indeed.com",
  "hiredtoday.com",
  "linkedin.com",
  "glints.com",
  "loker.id",
  "dealls.com",
  "kalibrr.id",
]);

const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map<string, { allowed: boolean; at: number }>();

function matchesKnown(host: string, known: Set<string>): boolean {
  if (known.has(host)) return true;
  for (const entry of known) {
    if (host.endsWith(`.${entry}`)) return true;
  }
  return false;
}

export async function canIframe(url: string): Promise<boolean> {
  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return false;
  }

  if (matchesKnown(host, KNOWN_ALLOWED_HOSTS)) return true;
  if (matchesKnown(host, KNOWN_DENIED_HOSTS)) return false;

  const cached = cache.get(host);
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.allowed;

  try {
    const res = await fetch(`/api/can-iframe?url=${encodeURIComponent(url)}`);
    const data = (await res.json()) as { allowed?: boolean };
    const allowed = data.allowed === true;
    cache.set(host, { allowed, at: Date.now() });
    return allowed;
  } catch {
    return false;
  }
}
