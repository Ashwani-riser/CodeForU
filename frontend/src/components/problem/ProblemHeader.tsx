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
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href={ROUTES.PROBLEMS} className="hover:text-foreground transition-colors">
          Problems
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium truncate">{problem.title}</span>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-bold">{problem.title}</h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {problem.tags?.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
