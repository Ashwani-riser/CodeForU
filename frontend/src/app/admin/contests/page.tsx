"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle, Clock, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { contestService } from "@/services/contest.service";
import type { Contest } from "@/types/contest.types";

const statusColors = {
  UPCOMING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  RUNNING: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  ENDED: "bg-muted text-muted-foreground border-border",
};

export default function AdminContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await contestService.getAll();
        setContests(res.data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Contests</h1>
          <p className="text-muted-foreground">{contests.length} contests total</p>
        </div>
        <Link href="/admin/contests/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Contest
          </Button>
        </Link>
      </motion.div>

      {isLoading ? (
        <TableSkeleton rows={5} />
      ) : contests.length === 0 ? (
        <EmptyState title="No contests yet" description="Create your first contest." />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Participants</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contests.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[c.status]}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(c.startTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{c.participantCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
