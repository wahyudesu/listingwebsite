"use client";

import {
  Bookmark,
  ExternalLink,
  MapPin,
  Maximize,
  Minimize,
  PanelLeftOpen,
  RectangleHorizontal,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import JobPreview from "@/components/job-preview";
import { AIInput } from "@/components/ui/ai-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Job } from "@/lib/jobs";
import { cn } from "@/lib/utils";

interface JobExplorerProps {
  query: string;
  jobs: Job[];
}

export default function JobExplorer({ query, jobs }: JobExplorerProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Job | null>(null);
  const [hovered, setHovered] = useState<Job | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kalau query berubah, pertahankan selected hanya jika masih ada di hasil baru
  const prevQueryRef = useRef(query);
  if (prevQueryRef.current !== query) {
    prevQueryRef.current = query;
    const stillExists = selected && jobs.some((j) => j.id === selected.id);
    if (!stillExists) setSelected(null);
  }

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
    <main
      className={cn(
        "relative grid h-full min-h-0 grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]",
        sidebarHidden && "md:grid-cols-1",
      )}
    >
      <section
        className={cn("flex min-h-0 flex-col", sidebarHidden && "hidden")}
      >
        <div className="p-3">
          <AIInput
            defaultValue={query}
            placeholder="Cari lowongan kerja..."
            className="py-0"
            onSubmit={(value) => {
              const q = value.trim();
              router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
            }}
          />
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="w-full h-100 py-6 px-2">
              <TabsTrigger value="all" className="flex-1 h-8">
                <Search className="size-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="fresh" className="flex-1 h-8">
                <Star className="size-4" />
                Fresh
              </TabsTrigger>
              <TabsTrigger value="job" className="flex-1 h-8">
                <MapPin className="size-4" />
                Job
              </TabsTrigger>
              <TabsTrigger value="bookmark" className="flex-1 h-8">
                <Bookmark className="size-4" />
                Bookmark
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="mt-2 text-xs text-muted-foreground">
            {jobs.length} lowongan ditemukan
            {query ? ` untuk "${query}"` : ""}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
          {jobs.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              Tidak ada lowongan yang cocok dengan pencarian &quot;{query}
              &quot;.
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {jobs.map((job) => (
                <li key={job.id}>
                  <div className="relative rounded-lg">
                    <button
                      type="button"
                      onMouseEnter={() => handleMouseEnter(job)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setSelected(job)}
                      className={cn(
                        "w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted",
                        selected?.id === job.id && "bg-accent hover:bg-accent",
                      )}
                    >
                      <p className="line-clamp-2 pr-7 text-sm font-medium text-foreground">
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
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setLoginPrompt(true)}
                      className="absolute right-2 bottom-2 text-muted-foreground"
                    >
                      <Bookmark className="size-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted px-4 py-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => setSidebarHidden((v) => !v)}
                  >
                    {sidebarHidden ? (
                      <PanelLeftOpen className="size-4" />
                    ) : (
                      <RectangleHorizontal className="size-4" />
                    )}
                  </Button>
                }
              />
              <TooltipContent>
                {sidebarHidden ? "Tampilkan sidebar" : "Landscape view"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              disabled={!selected}
            >
              {isFullscreen ? (
                <Minimize className="size-3.5" />
              ) : (
                <Maximize className="size-3.5" />
              )}
              Fullscreen
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!selected}
              nativeButton={false}
              render={selected ? <a href={selected.url} target="_blank" rel="noopener noreferrer" /> : <span />}
            >
              <ExternalLink className="size-3.5" />
              Buka di tab baru
            </Button>
          </div>
        </div>
        <div ref={previewRef} className="flex min-h-0 flex-1 flex-col bg-muted/30">
          {selected ? (
            <JobPreview job={selected} />
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Pilih lowongan untuk melihat preview.
              </p>
            </div>
          )}
        </div>
      </section>

      {hovered && hovered.id !== selected?.id && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] top-0 h-[800px] w-[1200px] overflow-hidden"
        >
          <JobPreview job={hovered} />
        </div>
      )}

      <Dialog open={loginPrompt} onOpenChange={setLoginPrompt}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="flex size-9 items-center justify-center rounded-full bg-muted">
              <Bookmark className="size-4" />
            </div>
            <DialogTitle>Simpan lowongan</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Kamu perlu login untuk menyimpan lowongan kerja.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginPrompt(false)}>
              Batal
            </Button>
            <Button nativeButton={false} render={<Link href="/login" />}>
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
