"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertOctagon } from "lucide-react";
import { VerdictBadge } from "./VerdictBadge";
import type { RunCodeResponse, Submission } from "@/types/submission.types";

interface OutputPanelProps {
  output: RunCodeResponse | null;
  submission: Submission | null;
  error: string | null;
}

export function OutputPanel({ output, submission, error }: OutputPanelProps) {
  const hasResult = output || submission || error;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/40 bg-card/30">
        <span className="text-xs font-medium text-muted-foreground">Output</span>
        {(output || submission) && (
          <span className="text-[10px] text-muted-foreground">
            {output?.executionTime ?? submission?.executionTime ?? 0}ms
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={hasResult ? "result" : "empty"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 space-y-2.5"
          >
            {error && (
              <div className="flex items-start gap-2 text-xs text-red-400">
                <AlertOctagon className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {output && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  {output.success ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Success
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400">
                      <XCircle className="h-3.5 w-3.5" /> Failed
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {output.executionTime}ms
                  </span>
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap bg-muted/30 rounded-md p-2.5 text-foreground/90 border border-border/30 max-h-[120px] overflow-auto">
                  {output.output || output.error || "No output"}
                </pre>
              </div>
            )}

            {submission && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <VerdictBadge verdict={submission.verdict} />
                  {submission.executionTime > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {submission.executionTime}ms
                    </span>
                  )}
                </div>
                {submission.compileError && (
                  <pre className="text-xs font-mono whitespace-pre-wrap bg-red-500/5 border border-red-500/20 rounded-md p-2.5 text-red-400 max-h-[120px] overflow-auto">
                    {submission.compileError}
                  </pre>
                )}
              </div>
            )}

            {!hasResult && (
              <div className="text-xs text-muted-foreground py-2">
                Run or submit your code to see results.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
