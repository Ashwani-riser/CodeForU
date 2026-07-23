"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { problemService } from "@/services/problem.service";
import { testcaseService } from "@/services/testcase.service";
import { ProblemForm } from "@/components/admin/ProblemForm";
import { PageSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import type { Problem, TestCase } from "@/types/problem.types";

export default function EditProblemPage() {
  const params = useParams();
  const router = useRouter();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [hiddenTestCases, setHiddenTestCases] = useState<{ input: string; expectedOutput: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const slug = params.slug as string;
        const res = await problemService.getBySlug(slug);
        setProblem(res.data);

        try {
          const tcRes = await testcaseService.getByProblemId(res.data._id);
          const hidden = tcRes.data
            .filter((tc: TestCase) => tc.isHidden)
            .map((tc: TestCase) => ({ input: tc.input, expectedOutput: tc.expectedOutput }));
          setHiddenTestCases(hidden);
        } catch {
          setHiddenTestCases([]);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load problem");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblem();
  }, [params.slug]);

  if (isLoading) return <div className="p-6"><PageSkeleton /></div>;
  if (error || !problem) return <div className="p-6"><ErrorState description={error || "Problem not found"} onRetry={() => router.refresh()} /></div>;

  return (
    <div className="p-6">
      <ProblemForm mode="edit" initialData={problem} initialHiddenTestCases={hiddenTestCases} />
    </div>
  );
}
