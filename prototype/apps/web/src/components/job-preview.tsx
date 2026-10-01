"use client";

import { ExternalLink, Loader2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

import { canIframe } from "@/lib/iframe";
import type { Job } from "@/lib/jobs";

const IFRAME_SANDBOX =
  "allow-scripts allow-same-origin allow-forms allow-popups allow-downloads";

type Mode = "checking" | "iframe" | "proxy";

interface JobPreviewProps {
  job: Job;
}

export default function JobPreview({ job }: JobPreviewProps) {
  const [mode, setMode] = useState<Mode>("checking");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    setMode("checking");
    setLoaded(false);
    setFailed(false);

    let cancelled = false;
    canIframe(job.url).then((allowed) => {
      if (!cancelled) setMode(allowed ? "iframe" : "proxy");
    });
    return () => {
      cancelled = true;
    };
  }, [job.url]);

  useEffect(() => {
    let link: HTMLLinkElement | null = null;
    try {
      link = document.createElement("link");
      link.rel = "preconnect";
      link.href = new URL(job.url).origin;
      document.head.appendChild(link);
    } catch {
      // url tidak valid, lewati preconnect
    }
    return () => {
      link?.remove();
    };
  }, [job.url]);

  const src =
    mode === "proxy"
      ? `/api/proxy?url=${encodeURIComponent(job.url)}&r=${retry}`
      : job.url;

  useEffect(() => {
    if (mode !== "iframe" || loaded) return;
    const timer = setTimeout(() => {
      setLoaded(false);
      setMode("proxy");
    }, 12_000);
    return () => clearTimeout(timer);
  }, [mode, loaded, src]);

  const retryButton = (
    <button
      type="button"
      onClick={() => {
        setRetry((r) => r + 1);
        setFailed(false);
        setLoaded(false);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
    >
      <RotateCw className="size-3.5" />
      Coba lagi
    </button>
  );

  const openButton = (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
    >
      <ExternalLink className="size-3.5" />
      Buka di tab baru
    </a>
  );

  if (failed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="max-w-md text-sm text-muted-foreground">
          Gagal memuat preview situs ini. Situs mungkin menolak akses atau sedang
          tidak tersedia.
        </p>
        <div className="flex items-center gap-2">
          {retryButton}
          {openButton}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-0 flex-1 bg-muted">
      {(mode === "iframe" || mode === "proxy") && (
        <>
          <iframe
            key={src}
            src={src}
            title={job.title}
            sandbox={IFRAME_SANDBOX}
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0 bg-white"
          />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
                Memuat website...
              </div>
            </div>
          )}
          {mode === "proxy" && loaded && (
            <div className="absolute bottom-2 right-2 max-w-xs rounded-md border border-border bg-background/90 px-2.5 py-1.5 text-[11px] text-muted-foreground">
              Pratinjau dirender oleh server. Situs aslinya menolak embed — untuk
              aksi penuh,{" "}
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                buka di tab baru
              </a>
              .
            </div>
          )}
        </>
      )}

      {mode === "checking" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
