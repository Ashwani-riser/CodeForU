"use client";

import { motion } from "framer-motion";
import type { Problem } from "@/types/problem.types";
import { SampleTestCaseCard } from "./SampleTestCaseCard";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl shadow-lg hover:border-[#10B98155] transition-all duration-300 p-8 space-y-8">
        <div>
          <h3 className="font-semibold text-xl mb-3 text-emerald-400">Problem Statement</h3>
          <div className="text-sm leading-8 whitespace-pre-wrap text-slate-300">
            {problem.statement}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-cyan-400">Input Format</h3>
          <div className="text-sm leading-8 whitespace-pre-wrap text-slate-300">{problem.inputFormat}</div>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-cyan-400">Output Format</h3>
          <div className="text-sm leading-8 whitespace-pre-wrap text-slate-300">{problem.outputFormat}</div>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-emerald-400">Sample Test Cases</h3>
          {problem.sampleTestCases && problem.sampleTestCases.length > 0 ? (
            <div className="space-y-4">
              {problem.sampleTestCases.map((sample, i) => (
                <SampleTestCaseCard key={i} index={i + 1} sample={sample} />
              ))}
            </div>
          ) : (
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">No sample test cases available.</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-emerald-400">Constraints</h3>
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
            <div className="font-mono text-sm leading-8 whitespace-pre-wrap text-slate-300">{problem.constraints}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
