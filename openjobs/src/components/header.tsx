"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        openjobs
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" nativeButton={false} render={<Link href="/directory" />}>
          Directory
        </Button>
        <ModeToggle />
        <Button variant="default" nativeButton={false} render={<Link href="/login" />}>
          Login
        </Button>
      </div>
    </div>
  );
}
