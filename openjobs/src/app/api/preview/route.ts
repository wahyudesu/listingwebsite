import { navigate, newPage } from "@/lib/browser";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return Response.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return Response.json({ error: "Invalid url" }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol)) {
    return Response.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  const page = await newPage();
  try {
    await navigate(page, url);

    const screenshot = await page.screenshot({
      type: "jpeg",
      quality: 70,
      fullPage: true,
    });

    return new Response(new Uint8Array(screenshot), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Preview failed", detail: String(error) },
      { status: 502 },
    );
  } finally {
    await page
      .context()
      .close()
      .catch(() => {});
  }
}
