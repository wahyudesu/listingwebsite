import { ExternalLink, Globe } from "lucide-react";
import type { Metadata } from "next";

import { SOURCE_SITES } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Directory Sumber Lowongan",
  description:
    "Daftar website yang digunakan sebagai sumber lowongan kerja di OpenJobs.",
};

export default function DirectoryPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 overflow-y-auto p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Directory Sumber Lowongan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Daftar website yang digunakan sebagai sumber data lowongan kerja di
          OpenJobs.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SOURCE_SITES.map((site) => (
          <li key={site.name}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm transition-colors hover:bg-muted"
            >
              <Globe className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex-1 font-medium text-foreground">
                {site.name}
              </span>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
