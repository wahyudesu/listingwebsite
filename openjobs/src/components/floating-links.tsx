"use client";

import { Badge } from "@/components/ui/badge";

export default function FloatingLinks() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <a
        href="/terms"
        className="inline-flex items-center rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Terms of Service
      </a>
      <a
        href="/privacy"
        className="inline-flex items-center rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Privacy Policy
      </a>
      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm opacity-60"
      >
        MCP
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
          Soon
        </Badge>
      </button>
    </div>
  );
}
