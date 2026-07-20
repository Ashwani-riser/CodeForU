"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SampleTestCase } from "@/types/problem.types";

interface SampleTestCaseCardProps {
  index: number;
  sample: SampleTestCase;
}

export function SampleTestCaseCard({ index, sample }: SampleTestCaseCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Example {index}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Sample Input</p>
            <div className="relative rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
              <div className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground border-b border-border/30 bg-muted/50">
                Input
              </div>
              <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre">{sample.input}</pre>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Sample Output</p>
            <div className="relative rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
              <div className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground border-b border-border/30 bg-muted/50">
                Output
              </div>
              <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre">{sample.output}</pre>
            </div>
          </div>
        </div>
        {sample.explanation && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Explanation</p>
            <p className="text-xs text-foreground/80 leading-relaxed">{sample.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
