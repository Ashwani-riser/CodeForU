"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CustomInputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomInputPanel({ value, onChange }: CustomInputPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/40 bg-card/30">
        <span className="text-xs font-medium text-muted-foreground">Input</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </Button>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your test input here..."
          className="h-full font-mono text-xs bg-transparent resize-none border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3"
        />
      </div>
    </div>
  );
}
