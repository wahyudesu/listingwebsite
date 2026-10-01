"use client";

import { AIInput } from "@/components/ui/ai-input";

export { AIInput } from "@/components/ui/ai-input";

export function AIInputDemo() {
  return (
    <div>
      <AIInput onSubmit={(value) => console.log("Submitted:", value)} />
    </div>
  );
}
