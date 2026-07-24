"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertOctagon } from "lucide-react";
import { VerdictBadge } from "./VerdictBadge";
import type { RunCodeResponse, Submission, SampleRunResults } from "@/types/submission.types";

interface OutputPanelProps {
  output: RunCodeResponse | null;
  submission: Submission | null;
  sampleResults: SampleRunResults | null;
  error: string | null;
}

export function OutputPanel({ output, submission, sampleResults, error }: OutputPanelProps) {
  const hasResult = output || submission || sampleResults || error;

  return (
    <div className="flex flex-col h-full bg-[#0D1117]">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1F2937] bg-[#111827]">
        <span className="text-xs font-medium text-slate-400">Output</span>
        {output && (
          <span className="text-[10px] text-slate-400">{output.executionTime}ms</span>
        )}
        {submission && (
          <span className="text-[10px] text-slate-400">{submission.executionTime}ms</span>
        )}
        {sampleResults && (
          <span className="text-[10px] text-slate-400">{sampleResults.totalExecutionTime}ms</span>
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

            {output && !sampleResults && (
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
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> {output.executionTime}ms
                  </span>
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap bg-[#0D1117] rounded-xl p-3 text-slate-200 border border-[#1F2937] max-h-[120px] overflow-auto">
                  {output.output || output.error || "No output"}
                </pre>
              </div>
            )}

            {sampleResults && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  {sampleResults.allPassed ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> All {sampleResults.totalSamples} sample(s) passed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 font-medium">
                      <XCircle className="h-3.5 w-3.5" /> Passed {sampleResults.totalPassed}/{sampleResults.totalSamples} sample(s)
                    </span>
                  )}
                </div>
                {sampleResults.results.map((r) => (
                  <div key={r.sampleIndex} className="border border-[#1F2937] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#111827] border-b border-[#1F2937]">
                      <span className="text-[10px] font-medium text-slate-400">Sample {r.sampleIndex}</span>
                      <div className="flex items-center gap-2">
                        {r.passed ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Passed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-red-400">
                            <XCircle className="h-3 w-3" /> Failed
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">{r.executionTime}ms</span>
                      </div>
                    </div>
                    <div className="p-2.5 space-y-1.5">
                      <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Input</span>
                        <pre className="text-[11px] font-mono whitespace-pre-wrap mt-0.5 p-2 bg-[#0B1120] rounded-lg text-slate-300 border border-[#1F2937] max-h-[40px] overflow-auto">{r.input || "(empty)"}</pre>
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Expected</span>
                        <pre className="text-[11px] font-mono whitespace-pre-wrap mt-0.5 p-2 bg-[#0B1120] rounded-lg text-slate-300 border border-[#1F2937] max-h-[40px] overflow-auto">{r.expectedOutput || "(empty)"}</pre>
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Your Output</span>
                        <pre className={`text-[11px] font-mono whitespace-pre-wrap mt-0.5 p-2 rounded-lg border max-h-[40px] overflow-auto ${r.passed ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300" : "bg-red-500/5 border-red-500/20 text-red-300"}`}>{r.actualOutput || "(no output)"}</pre>
                      </div>
                      {r.error && (
                        <div>
                          <span className="text-[10px] font-medium text-red-500 uppercase tracking-wider">Error</span>
                          <pre className="text-[11px] font-mono whitespace-pre-wrap mt-0.5 p-2 bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg max-h-[40px] overflow-auto">{r.error}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {submission && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <VerdictBadge verdict={submission.verdict} />
                  {submission.executionTime > 0 && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" /> {submission.executionTime}ms
                    </span>
                  )}
                </div>
                {submission.compileError && (
                  <pre className="text-xs font-mono whitespace-pre-wrap bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-red-400 max-h-[120px] overflow-auto">
                    {submission.compileError}
                  </pre>
                )}
              </div>
            )}

            {!hasResult && (
              <div className="text-xs text-slate-500 py-2">
                Run or submit your code to see results.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
