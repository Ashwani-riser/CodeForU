"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemDescription } from "./ProblemDescription";
import { ProblemSubmissions } from "./ProblemSubmissions";
import type { Problem } from "@/types/problem.types";

interface ProblemTabsProps {
  problem: Problem;
}

export function ProblemTabs({ problem }: ProblemTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start h-10 bg-[#111827] border border-[#1F2937] rounded-xl p-1">
        <TabsTrigger
          value="description"
          className="text-xs font-medium text-slate-400 data-[active]:text-emerald-400 data-[active]:bg-[#0F172A] rounded-lg transition-all duration-200"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="editorial"
          className="text-xs font-medium text-slate-400 data-[active]:text-emerald-400 data-[active]:bg-[#0F172A] rounded-lg transition-all duration-200"
        >
          Editorial
        </TabsTrigger>
        <TabsTrigger
          value="submissions"
          className="text-xs font-medium text-slate-400 data-[active]:text-emerald-400 data-[active]:bg-[#0F172A] rounded-lg transition-all duration-200"
        >
          Submissions
        </TabsTrigger>
        <TabsTrigger
          value="discussion"
          className="text-xs font-medium text-slate-400 data-[active]:text-emerald-400 data-[active]:bg-[#0F172A] rounded-lg transition-all duration-200"
        >
          Discussion
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4">
        <ProblemDescription problem={problem} />
      </TabsContent>

      <TabsContent value="editorial" className="mt-4">
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">Editorial coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="submissions" className="mt-4">
        <ProblemSubmissions problemId={problem._id} />
      </TabsContent>

      <TabsContent value="discussion" className="mt-4">
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">Discussion section coming soon.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
