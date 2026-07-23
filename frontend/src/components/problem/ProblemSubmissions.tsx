"use client";

import { useEffect, useState } from "react";
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
    return <div className="flex items-center justify-center py-8 text-sm text-slate-400">Loading submissions...</div>;
  }

  if (submissions.length === 0) {
    return <EmptyState title="No submissions yet" description="Write your code and hit Submit!" />;
  }

  return (
    <div className="space-y-2">
      {submissions.map((sub) => (
        <div key={sub._id} className="bg-[#111827] border border-[#1F2937] rounded-2xl px-4 py-2.5 hover:border-[#10B98155] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VerdictBadge verdict={sub.verdict} size="sm" />
              <Badge variant="outline" className="text-xs uppercase border-[#1F2937] text-slate-400">
                {sub.language}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              {sub.executionTime > 0 && <span>{sub.executionTime}ms</span>}
              <span>{new Date(sub.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
