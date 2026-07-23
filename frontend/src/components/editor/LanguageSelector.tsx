"use client";

import { Code2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/constants";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val ?? value)}>
      <SelectTrigger className="w-[130px] h-8 bg-[#0F172A] border-[#1F2937] text-xs text-slate-300 hover:border-[#10B98155] transition-colors">
        <Code2 className="h-3.5 w-3.5 mr-1 text-[#10B981]" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-[#111827] border-[#1F2937]">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="text-xs text-slate-300 focus:bg-[#0F172A] focus:text-slate-100">
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
