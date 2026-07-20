"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Group, Panel, Separator } from "react-resizable-panels";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProblemHeader } from "@/components/problem/ProblemHeader";
import { ProblemDescription } from "@/components/problem/ProblemDescription";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { OutputPanel } from "@/components/editor/OutputPanel";
import { CustomInputPanel } from "@/components/editor/CustomInputPanel";
import { PageSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { problemService } from "@/services/problem.service";
import { submissionService } from "@/services/submission.service";
import { useEditorState } from "@/hooks/useEditorState";
import { useProblemPageStore } from "@/store/useProblemPageStore";
import type { Problem } from "@/types/problem.types";
import type { RunCodeResponse, Submission } from "@/types/submission.types";

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { language, setLanguage, code, setCode } = useEditorState(slug);
  const { fontSize, isFullscreen } = useProblemPageStore();

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState<RunCodeResponse | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await problemService.getBySlug(slug);
        setProblem(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load problem");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblem();
  }, [slug]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput(null);
    setSubmission(null);
    setApiError(null);
    try {
      const res = await submissionService.runCode({ language, sourceCode: code, input: customInput || undefined });
      setOutput(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setApiError("Please log in to run code");
        window.location.href = "/login";
        return;
      }
      setApiError(err?.response?.data?.message || "Failed to run code");
    } finally {
      setIsRunning(false);
    }
  }, [language, code, customInput]);

  const handleSubmit = useCallback(async () => {
    if (!problem) return;
    setIsSubmitting(true);
    setOutput(null);
    setSubmission(null);
    setApiError(null);
    try {
      const res = await submissionService.submit({ problemId: problem._id, language, sourceCode: code });
      setSubmission(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setApiError("Please log in to submit code");
        window.location.href = "/login";
        return;
      }
      setApiError(err?.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  }, [problem, language, code]);

  const handleReset = useCallback(() => {
    const defaults: Record<string, string> = {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`,
      c: `#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
      python: `# Your code here\n`,
    };
    setCode(defaults[language] || defaults.cpp);
  }, [language, setCode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) handleSubmit();
        else handleRun();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRun, handleSubmit]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><PageSkeleton /></div>;
  if (error || !problem) return <div className="h-screen flex items-center justify-center"><ErrorState description={error || "Problem not found"} /></div>;

  const problemContent = (
    <div className="p-4 space-y-4">
      <ProblemHeader problem={problem} />
      <ProblemDescription problem={problem} />
    </div>
  );

  const editorContent = (
    <div className="flex flex-col h-full">
      <EditorToolbar
        language={language}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        code={code}
      />
      <div className="flex-1 min-h-0">
        <CodeEditor language={language} value={code} onChange={setCode} fontSize={fontSize} />
      </div>
      <div className="h-[240px] min-h-[200px] flex border-t border-border/40">
        <div className="w-1/2 min-w-0 border-r border-border/40">
          <CustomInputPanel value={customInput} onChange={setCustomInput} />
        </div>
        <div className="w-1/2 min-w-0">
          <OutputPanel output={output} submission={submission} error={apiError} />
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} flex flex-col h-[calc(100vh-3.5rem)]`}>
        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col h-full overflow-auto">
          <div className="shrink-0">{problemContent}</div>
          <div className="shrink-0 border-t border-border/40">
            {editorContent}
          </div>
        </div>

        {/* Desktop: resizable panels */}
        <div className="hidden md:block h-full">
          <Group orientation="horizontal" id="problem-layout">
            <Panel defaultSize={45} minSize={35} className="overflow-hidden">
              <ScrollArea className="h-full">
                {problemContent}
              </ScrollArea>
            </Panel>

            <Separator className="w-1.5 bg-border/30 hover:bg-primary/30 transition-colors" />

            <Panel defaultSize={55} minSize={40} className="overflow-hidden">
              {editorContent}
            </Panel>
          </Group>
        </div>
      </div>
    </TooltipProvider>
  );
}
