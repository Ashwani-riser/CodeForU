"use client";

import { ProblemForm } from "@/components/admin/ProblemForm";

export default function CreateProblemPage() {
  return (
    <div className="p-6">
      <ProblemForm mode="create" />
    </div>
  );
}
