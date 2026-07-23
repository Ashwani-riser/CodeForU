"use client";

import { CodePanel } from "@/components/editor/CodePanel";

export default function PlaygroundPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] bg-[#0B1120]">
      <CodePanel problemSlug="playground" showSubmit={false} />
    </div>
  );
}
