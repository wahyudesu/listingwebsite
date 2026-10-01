"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@prototype/ui/lib/utils";

interface SearchBarProps {
  defaultQuery?: string;
  autoFocus?: boolean;
  large?: boolean;
}

export default function SearchBar({
  defaultQuery = "",
  autoFocus = false,
  large = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  function submit() {
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-full border border-input bg-background px-4 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-ring/50",
          large ? "h-12" : "h-9",
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari lowongan kerja..."
          autoFocus={autoFocus}
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        className="h-9 rounded-md border border-border bg-secondary px-4 text-sm text-secondary-foreground transition-colors hover:bg-muted"
      >
        Search
      </button>
    </form>
  );
}
