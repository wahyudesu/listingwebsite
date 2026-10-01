"use client";

import { ExternalLink, MapPin, Maximize, Minimize } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@prototype/ui/lib/utils";

import JobPreview from "@/components/job-preview";
import SearchBar from "@/components/search-bar";
import type { Job } from "@/lib/jobs";

interface JobExplorerProps {
  query: string;
  jobs: Job[];
}

export default function JobExplorer({ query, jobs }: JobExplorerProps) {
  const [selected, setSelected] = useState<Job | null>(null);
  const [hovered, setHovered] = useState<Job | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  function handleMouseEnter(job: Job) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHovered(job), 300);
  }

  function handleMouseLeave() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    setHovered(null);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void previewRef.current?.requestFullscreen();
    }
  }

  return (
    <main className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
      <section className="flex min-h-0 flex-col border-border md:border-r">
        <div className="border-b border-border p-3">
          <SearchBar defaultQuery={query} />
          <p className="mt-2 text-xs text-muted-foreground">
            {jobs.length} lowongan ditemukan
            {query ? ` untuk "${query}"` : ""}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {jobs.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              Tidak ada lowongan yang cocok dengan pencarian &quot;{query}
              &quot;.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {jobs.map((job) => (
                <li key={job.id}>
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnter(job)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelected(job)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors hover:bg-muted",
                      selected?.id === job.id && "bg-accent hover:bg-accent",
                    )}
                  >
                    <p className="line-clamp-2 text-sm font-medium text-foreground">
                      {job.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {job.company}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3 shrink-0" />
                      {job.location}
                    </p>
                    <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {job.source}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="flex min-h-0 flex-col">
        {selected ? (
          <>
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{selected.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {selected.source} • {selected.company}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
              >
                {isFullscreen ? (
                  <Minimize className="size-3.5" />
                ) : (
                  <Maximize className="size-3.5" />
                )}
                Fullscreen
              </button>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
              >
                <ExternalLink className="size-3.5" />
                Buka di tab baru
              </a>
            </div>
          </div>
          <div ref={previewRef} className="flex min-h-0 flex-1 flex-col">
            <JobPreview job={selected} />
          </div>
        </>
      ) : (
          <div className="flex flex-1 items-center justify-center p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Select a page from the list to preview it.
            </p>
          </div>
        )}
      </section>

      {hovered && hovered.id !== selected?.id && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] top-0 h-[800px] w-[1200px] overflow-hidden"
        >
          <JobPreview job={hovered} />
        </div>
      )}
    </main>
  );
}
