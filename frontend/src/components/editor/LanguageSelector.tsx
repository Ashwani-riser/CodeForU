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
      <SelectTrigger className="w-[130px] h-8 bg-background/50 border-border/50 text-xs">
        <Code2 className="h-3.5 w-3.5 mr-1 text-primary" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="text-xs">
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
