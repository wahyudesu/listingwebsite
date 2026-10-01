"use client";

import { Bookmark, Search, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AIInput } from "@/components/jobs-input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  function handleSubmit(value: string) {
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 overflow-hidden px-4">
      <h1 className="text-5xl font-bold tracking-tight">JobSearch</h1>
      <div className="flex w-full max-w-xl flex-col">
        <AIInput
          onSubmit={handleSubmit}
          placeholder="Cari lowongan kerja..."
        />
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/search" />}>
            <Search className="size-4" />
            Explore
          </Button>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/search?tab=fresh" />}>
            <Star className="size-4" />
            Fresh
          </Button>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/login" />}>
            <Bookmark className="size-4" />
            Bookmark
          </Button>
        </div>
      </div>
    </main>
  );
}
