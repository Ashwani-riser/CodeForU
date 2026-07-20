"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";
import { TagBadge } from "@/components/problems/TagBadge";
import { Pagination } from "@/components/common/Pagination";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { problemService } from "@/services/problem.service";
import { useDebounce } from "@/hooks/useDebounce";
import type { PaginatedProblems } from "@/types/problem.types";

const DIFFICULTY_BAR: Record<string, string> = {
  Easy: "bg-emerald-400",
  Medium: "bg-amber-400",
  Hard: "bg-red-400",
};

export default function ProblemsPage() {
  const [data, setData] = useState<PaginatedProblems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await problemService.getAll({
        search: debouncedSearch,
        difficulty,
        page,
        limit: 20,
        sort: "createdAt",
        order: "desc",
      });
      setData(res.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, difficulty, page]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Problems</h1>
        <p className="text-muted-foreground">
          Practice coding problems to improve your skills
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <Select
          value={difficulty}
          onValueChange={(val) => { setDifficulty(val === "all" ? "" : (val ?? "")); setPage(1); }}
        >
          <SelectTrigger className="w-[150px] bg-background/50 border-border/50">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {isLoading ? (
        <TableSkeleton rows={10} />
      ) : !data || data.problems.length === 0 ? (
        <EmptyState title="No problems found" description="Try adjusting your search or filters." />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-border/50 bg-card/50 glass overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence>
                {data.problems.map((problem, i) => (
                  <motion.div
                    key={problem._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={`/problems/${problem.slug}`}
                      className="flex items-center gap-4 px-5 py-3.5 border-b border-border/30 last:border-b-0 hover:bg-muted/30 transition-all duration-200 group"
                    >
                      {/* Difficulty color bar */}
                      <div className={`w-1 h-8 rounded-full ${DIFFICULTY_BAR[problem.difficulty] || "bg-muted-foreground/30"} group-hover:h-10 transition-all duration-200`} />

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">
                          {problem.title}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {problem.tags?.slice(0, 4).map((tag) => (
                            <TagBadge key={tag} tag={tag} />
                          ))}
                          {(problem.tags?.length || 0) > 4 && (
                            <span className="text-xs text-muted-foreground">+{problem.tags.length - 4}</span>
                          )}
                        </div>
                      </div>

                      <DifficultyBadge difficulty={problem.difficulty} className="shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
          <div className="mt-4">
            <Pagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
