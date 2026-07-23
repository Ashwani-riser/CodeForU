"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";
import { TagBadge } from "@/components/problems/TagBadge";
import { ROUTES } from "@/constants";
import type { Problem } from "@/types/problem.types";

interface ProblemHeaderProps {
  problem: Problem;
}

export function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href={ROUTES.PROBLEMS} className="hover:text-slate-200 transition-colors">
          Problems
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-100 font-medium truncate">{problem.title}</span>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-2xl font-bold text-slate-100">{problem.title}</h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {problem.tags?.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              className="bg-[rgba(6,182,212,.15)] text-cyan-300 border-[rgba(6,182,212,.35)] rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
