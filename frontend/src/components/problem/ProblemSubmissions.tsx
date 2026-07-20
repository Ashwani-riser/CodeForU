"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerdictBadge } from "@/components/editor/VerdictBadge";
import { submissionService } from "@/services/submission.service";
import { EmptyState } from "@/components/common/EmptyState";
import type { Submission } from "@/types/submission.types";

interface ProblemSubmissionsProps {
  problemId: string;
}

export function ProblemSubmissions({ problemId }: ProblemSubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await submissionService.getAll({ problemId });
        setSubmissions(res.data.submissions || []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [problemId]);

  if (loading) {
    return <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Loading submissions...</div>;
  }

  if (submissions.length === 0) {
    return <EmptyState title="No submissions yet" description="Write your code and hit Submit!" />;
  }

  return (
    <div className="space-y-2">
      {submissions.map((sub) => (
        <Card key={sub._id} className="border-border/30">
          <CardContent className="py-2.5 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <VerdictBadge verdict={sub.verdict} size="sm" />
                <Badge variant="outline" className="text-xs uppercase border-border/50 text-muted-foreground">
                  {sub.language}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {sub.executionTime > 0 && <span>{sub.executionTime}ms</span>}
                <span>{new Date(sub.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
