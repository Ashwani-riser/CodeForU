"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface HiddenTestCase {
  input: string;
  expectedOutput: string;
}

interface HiddenTestCasesFieldProps {
  value: HiddenTestCase[];
  onChange: (value: HiddenTestCase[]) => void;
}

export function HiddenTestCasesField({ value, onChange }: HiddenTestCasesFieldProps) {
  const addTestCase = () => {
    onChange([...value, { input: "", expectedOutput: "" }]);
  };

  const removeTestCase = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: keyof HiddenTestCase, fieldValue: string) => {
    const updated = value.map((tc, i) =>
      i === index ? { ...tc, [field]: fieldValue } : tc
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">Hidden Test Cases</Label>
          <p className="text-sm text-muted-foreground">
            These are used by the judge for evaluation. Never visible to users.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTestCase}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Hidden Test
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {value.map((tc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Hidden Test {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTestCase(index)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Input</Label>
                <Textarea
                  value={tc.input}
                  onChange={(e) => updateTestCase(index, "input", e.target.value)}
                  placeholder="Enter test input..."
                  className="min-h-[80px] font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Expected Output</Label>
                <Textarea
                  value={tc.expectedOutput}
                  onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                  placeholder="Enter expected output..."
                  className="min-h-[80px] font-mono text-sm"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
          No hidden test cases added yet. Add at least one for judging.
        </p>
      )}
    </div>
  );
}
