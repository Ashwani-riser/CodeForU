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
      <SelectTrigger className="w-[70px] h-8 bg-[#0F172A] border-[#1F2937] text-xs text-slate-300 hover:border-[#10B98155] transition-colors">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[#111827] border-[#1F2937]">
        {FONT_SIZES.map((size) => (
          <SelectItem key={size} value={String(size)} className="text-xs text-slate-300 focus:bg-[#0F172A] focus:text-slate-100">
            {size}px
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
