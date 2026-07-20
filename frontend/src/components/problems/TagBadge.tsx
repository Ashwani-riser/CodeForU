"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  array: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  string: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  hashmap: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  dp: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  "dynamic programming": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  tree: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20" },
  graph: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
  math: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  sorting: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  search: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  binary: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  stack: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
  queue: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  linkedlist: { bg: "bg-lime-500/10", text: "text-lime-400", border: "border-lime-500/20" },
  greedy: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  recursion: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-400", border: "border-fuchsia-500/20" },
  default: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
};

function getTagColor(tag: string) {
  const key = tag.toLowerCase();
  return TAG_COLORS[key] || TAG_COLORS.default;
}

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  const colors = getTagColor(tag);
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -1 }}
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium cursor-default transition-shadow hover:shadow-md",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {tag}
    </motion.span>
  );
}
