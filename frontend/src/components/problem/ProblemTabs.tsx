"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProblemDescription } from "./ProblemDescription";
import { ProblemSubmissions } from "./ProblemSubmissions";
import type { Problem } from "@/types/problem.types";

interface ProblemTabsProps {
  problem: Problem;
}

export function ProblemTabs({ problem }: ProblemTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start h-9">
        <TabsTrigger value="description" className="text-xs">Description</TabsTrigger>
        <TabsTrigger value="editorial" className="text-xs">Editorial</TabsTrigger>
        <TabsTrigger value="submissions" className="text-xs">Submissions</TabsTrigger>
        <TabsTrigger value="discussion" className="text-xs">Discussion</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4">
        <ProblemDescription problem={problem} />
      </TabsContent>

      <TabsContent value="editorial" className="mt-4">
        <Card className="border-border/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p className="text-sm">Editorial coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="submissions" className="mt-4">
        <ProblemSubmissions problemId={problem._id} />
      </TabsContent>

      <TabsContent value="discussion" className="mt-4">
        <Card className="border-border/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p className="text-sm">Discussion section coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
