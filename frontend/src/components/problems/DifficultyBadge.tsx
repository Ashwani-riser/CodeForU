"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DIFFICULTY_COLORS } from "@/constants";

interface DifficultyBadgeProps {
  difficulty: string;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -1 }}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium cursor-default transition-shadow hover:shadow-md",
        DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] ||
          "text-muted-foreground bg-muted border-border",
        className
      )}
    >
      {difficulty}
    </motion.span>
  );
}
