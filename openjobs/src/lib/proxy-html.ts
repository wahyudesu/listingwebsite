export function sanitizeProxiedHtml(
  html: string,
  target: URL,
  proxyOrigin: string,
): string {
  let out = html;

  out = out.replace(
    /<meta[^>]*http-equiv=["']content-security-policy["'][^>]*>/gi,
    "",
  );

  out = out
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "");

  out = out.replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");

  const proxyLink = (absUrl: string) =>
    `${proxyOrigin}/api/proxy?url=${encodeURIComponent(absUrl)}`;

  out = out.replace(/<head([^>]*)>/i, (_m, attrs: string) => {
    return `<head${attrs}><base href="${target.href}">`;
  });

  out = out.replace(
    /(<a\b[^>]*\bhref=["'])([^"']+)(["'])/gi,
    (m, pre, href, post) => {
      let abs: string;
      if (href.startsWith("/")) {
        abs = target.origin + href;
      } else if (href.startsWith(target.origin)) {
        abs = href;
      } else {
        return m;
      }
      return `${pre}${proxyLink(abs)}${post}`;
    },
  );

  return out;
}

export function proxyErrorPage(url: string, proxyOrigin: string): string {
  const encoded = encodeURIComponent(url);
  const screenshot = `${proxyOrigin}/api/preview?url=${encoded}`;
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>Preview gagal dimuat</title>
    <style>
      body { font-family: system-ui, sans-serif; display: flex; flex-direction: column;
             align-items: center; justify-content: center; gap: 16px; min-height: 100vh;
             margin: 0; background: #fff; color: #333; text-align: center; padding: 24px; }
      img { max-width: 100%; max-height: 60vh; border: 1px solid #ddd; border-radius: 6px; }
      .btn { display: inline-block; padding: 8px 14px; border: 1px solid #ccc; border-radius: 6px;
             text-decoration: none; color: #333; font-size: 14px; }
      .btn:hover { background: #f5f5f5; }
      p { max-width: 480px; font-size: 13px; color: #666; }
    </style>
  </head>
  <body>
    <strong>Gagal merender website ini</strong>
    <p>Halaman mungkin membutuhkan login atau menolak akses dari browser otomatis.</p>
    <img src="${screenshot}" alt="Pratinjau website" />
    <a class="btn" href="${url}" target="_blank" rel="noopener noreferrer">Buka di tab baru</a>
  </body>
</html>`;
}
