"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Problem } from "@/types/problem.types";
import { SampleTestCaseCard } from "./SampleTestCaseCard";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-5 space-y-5">
          <div>
            <h3 className="font-semibold text-sm mb-2 text-primary">Problem Statement</h3>
            <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
              {problem.statement}
            </div>
          </div>
          <Separator className="bg-border/50" />
          <div className="grid grid-cols-1 gap-5">
            <div>
              <h3 className="font-semibold text-sm mb-2 text-primary">Input Format</h3>
              <div className="text-sm whitespace-pre-wrap text-foreground/90">{problem.inputFormat}</div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2 text-primary">Output Format</h3>
              <div className="text-sm whitespace-pre-wrap text-foreground/90">{problem.outputFormat}</div>
            </div>
          </div>
          <Separator className="bg-border/50" />
          <div>
            <h3 className="font-semibold text-sm mb-2 text-primary">Constraints</h3>
            <div className="text-sm whitespace-pre-wrap text-foreground/90">{problem.constraints}</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-primary">Sample Test Cases</h3>
        {problem.sampleTestCases?.map((sample, i) => (
          <SampleTestCaseCard key={i} index={i + 1} sample={sample} />
        ))}
      </div>
    </div>
  );
}
