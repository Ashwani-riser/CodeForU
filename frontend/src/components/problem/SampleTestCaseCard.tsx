"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import type { SampleTestCase } from "@/types/problem.types";

interface SampleTestCaseCardProps {
  index: number;
  sample: SampleTestCase;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#1F2937] hover:bg-[#30363d] text-slate-400 hover:text-slate-200 transition-all duration-200 z-10"
      title="Copy to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function SampleTestCaseCard({ index, sample }: SampleTestCaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl hover:border-[#10B98155] transition-all duration-300 overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1E293B] bg-[#0F172A]">
          <h4 className="text-emerald-400 font-semibold text-lg">Sample {index}</h4>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-cyan-400 mb-2">Sample Input</p>
              <div className="relative rounded-xl bg-[#0F172A] overflow-hidden border border-[#1E293B]">
                <div className="px-4 py-2 text-xs font-medium text-cyan-400/70 border-b border-[#1E293B] bg-[#111827]">
                  Input {index}
                </div>
                <div className="relative">
                  <CopyButton text={sample.input} />
                  <pre className="p-4 font-mono text-sm overflow-x-auto whitespace-pre text-slate-200 leading-7">{sample.input}</pre>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-cyan-400 mb-2">Sample Output</p>
              <div className="relative rounded-xl bg-[#0F172A] overflow-hidden border border-[#1E293B]">
                <div className="px-4 py-2 text-xs font-medium text-cyan-400/70 border-b border-[#1E293B] bg-[#111827]">
                  Output {index}
                </div>
                <div className="relative">
                  <CopyButton text={sample.output} />
                  <pre className="p-4 font-mono text-sm overflow-x-auto whitespace-pre text-slate-200 leading-7">{sample.output}</pre>
                </div>
              </div>
            </div>
          </div>

          {sample.explanation && (
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1.5">Explanation</p>
              <p className="text-sm text-slate-300 leading-7">{sample.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
