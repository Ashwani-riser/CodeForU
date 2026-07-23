"use client";

import { useState } from "react";
import { Play, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Group, Panel, Separator } from "react-resizable-panels";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("./CodeEditor").then((m) => ({ default: m.CodeEditor })), { ssr: false });
import { LanguageSelector } from "./LanguageSelector";
import { OutputPanel } from "./OutputPanel";
import { CustomInputPanel } from "./CustomInputPanel";
import { useEditorState } from "@/hooks/useEditorState";
import { submissionService } from "@/services/submission.service";
import type { RunCodeResponse, Submission } from "@/types/submission.types";

interface CodePanelProps {
  problemId?: string;
  problemSlug: string;
  showSubmit?: boolean;
}

export function CodePanel({ problemId, problemSlug, showSubmit = true }: CodePanelProps) {
  const { language, setLanguage, code, setCode } = useEditorState(problemSlug);

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState<RunCodeResponse | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isRunningAny = isRunning || isSubmitting;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    setSubmission(null);
    setError(null);
    try {
      const res = await submissionService.runCode({ language, sourceCode: code, input: customInput || undefined });
      setOutput(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError("Please log in to run code");
        window.location.href = "/login";
        return;
      }
      setError(err?.response?.data?.message || "Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problemId) return;
    setIsSubmitting(true);
    setOutput(null);
    setSubmission(null);
    setError(null);
    try {
      const res = await submissionService.submit({ problemId, language, sourceCode: code });
      setSubmission(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError("Please log in to submit code");
        window.location.href = "/login";
        return;
      }
      setError(err?.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    const defaults: Record<string, string> = {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`,
      c: `#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
      python: `# Your code here\n`,
    };
    setCode(defaults[language] || defaults.cpp);
  };

  return (
    <div className="flex flex-col h-full bg-[#0B1120]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1F2937] bg-[#111827] sticky top-0 z-10">
        <LanguageSelector value={language} onChange={setLanguage} />
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 px-2.5 text-xs text-slate-400 hover:text-slate-200 gap-1"
          >
            Reset
          </Button>
          <div className="w-px h-4 bg-[#1F2937] mx-0.5" />
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunningAny}
            className="h-8 gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
            Run
          </Button>
          {showSubmit && problemId && (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isRunningAny}
              className="h-8 gap-1.5 bg-gradient-to-r from-[#0891b2] to-[#06B6D4] hover:from-[#0e7490] hover:to-[#0891b2] text-white text-xs font-medium"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Submit
            </Button>
          )}
        </div>
      </div>

      {/* Editor + Side Panel */}
      <div className="flex-1 min-h-0">
        <Group orientation="horizontal" id="code-panel-layout">
          <Panel defaultSize={70} minSize={50} className="overflow-hidden">
            <CodeEditor language={language} value={code} onChange={setCode} />
          </Panel>

          <Separator className="w-1 bg-[#1F2937] hover:bg-[#10B981]/30 transition-colors" />

          <Panel defaultSize={30} minSize={20}>
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-0 border-b border-[#1F2937]">
                <CustomInputPanel value={customInput} onChange={setCustomInput} />
              </div>
              <div className="flex-1 min-h-0">
                <OutputPanel output={output} submission={submission} error={error} />
              </div>
            </div>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
