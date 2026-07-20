"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { submissionService } from "@/services/submission.service";
import { VERDICT_COLORS, LANGUAGES } from "@/constants";
import type { Submission } from "@/types/submission.types";

function SubmissionsContent() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await submissionService.getMySubmissions();
        setSubmissions(res.data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">My Submissions</h1>
        <p className="text-muted-foreground">Your recent submissions</p>
      </motion.div>

      {isLoading ? (
        <TableSkeleton rows={10} />
      ) : submissions.length === 0 ? (
        <EmptyState title="No submissions yet" description="Submit a solution to see it here." />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Verdict</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((s) => (
                    <TableRow key={s._id}>
                      <TableCell className="font-medium">
                        {typeof s.problemId === "object" ? s.problemId.title : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{LANGUAGES.find(l => l.value === s.language)?.label || s.language}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${VERDICT_COLORS[s.verdict]?.split(" ")[0] || ""}`}>
                          {s.verdict}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {s.executionTime ? `${s.executionTime.toFixed(3)}s` : "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </TableCell>
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

export default function SubmissionsPage() {
  return (
    <ProtectedRoute>
      <SubmissionsContent />
    </ProtectedRoute>
  );
}
