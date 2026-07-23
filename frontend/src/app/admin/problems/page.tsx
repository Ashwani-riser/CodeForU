"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle, Search, Eye, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";
import { TagBadge } from "@/components/problems/TagBadge";
import { Pagination } from "@/components/common/Pagination";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { DeleteProblemDialog } from "@/components/admin/DeleteProblemDialog";
import { problemService } from "@/services/problem.service";
import { useDebounce } from "@/hooks/useDebounce";
import type { ProblemListItem } from "@/types/problem.types";
import type { PaginatedProblems } from "@/types/problem.types";

export default function AdminProblemsPage() {
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
        limit: 15,
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

  const handleDeleteSuccess = () => {
    fetchProblems();
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Manage Problems</h1>
          <p className="text-muted-foreground">
            {data?.pagination.totalProblems || 0} problems total
          </p>
        </div>
        <Link href="/admin/problems/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Problem
          </Button>
        </Link>
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={difficulty}
          onValueChange={(val) => {
            setDifficulty(val === "all" ? "" : (val ?? ""));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {isLoading ? (
        <TableSkeleton rows={10} />
      ) : !data || data.problems.length === 0 ? (
        <EmptyState
          title="No problems found"
          description="Create your first problem to get started."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.problems.map((problem, i) => (
                    <motion.tr
                      key={problem._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell>
                        <Link
                          href={`/problems/${problem.slug}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {problem.tags?.slice(0, 3).map((tag) => (
                            <TagBadge key={tag} tag={tag} />
                          ))}
                          {(problem.tags?.length || 0) > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{problem.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/problems/${problem.slug}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/problems/${problem.slug}/edit`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteProblemDialog
                            problemId={problem._id}
                            problemTitle={problem.title}
                            onSuccess={handleDeleteSuccess}
                          />
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
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
