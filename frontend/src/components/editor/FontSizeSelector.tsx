"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProblemPageStore } from "@/store/useProblemPageStore";

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20];

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useProblemPageStore();

  return (
    <Select value={String(fontSize)} onValueChange={(val) => setFontSize(Number(val))}>
      <SelectTrigger className="w-[70px] h-8 bg-background/50 border-border/50 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {FONT_SIZES.map((size) => (
          <SelectItem key={size} value={String(size)} className="text-xs">
            {size}px
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
