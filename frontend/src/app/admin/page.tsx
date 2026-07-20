"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode,
  Trophy,
  Users,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { problemService } from "@/services/problem.service";
import { contestService } from "@/services/contest.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ problems: 0, contests: 0 });
  const [recentProblems, setRecentProblems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsRes, contestsRes] = await Promise.all([
          problemService.getAll({ limit: 100 }),
          contestService.getAll(),
        ]);
        setStats({
          problems: problemsRes.data.pagination.totalProblems,
          contests: contestsRes.data.length,
        });
        setRecentProblems(problemsRes.data.problems.slice(0, 5));
      } catch {}
    };
    fetchData();
  }, []);

  const statCards = [
    { title: "Total Problems", value: stats.problems, icon: FileCode, color: "text-blue-500" },
    { title: "Total Contests", value: stats.contests, icon: Trophy, color: "text-purple-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-10 w-10 ${stat.color} opacity-20`} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/admin/problems/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Problem
          </Button>
        </Link>
        <Link href="/admin/contests/new">
          <Button variant="outline" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Contest
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Problems</CardTitle>
            <Link href="/admin/problems">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProblems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Tags</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProblems.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell className="font-medium">{p.title}</TableCell>
                      <TableCell><DifficultyBadge difficulty={p.difficulty} /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {p.tags?.slice(0, 3).join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No problems yet. Create your first problem!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
