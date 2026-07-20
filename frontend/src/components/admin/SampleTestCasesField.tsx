"use client";

import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CreateProblemFormData } from "@/schemas";

interface SampleTestCasesFieldProps {
  control: Control<CreateProblemFormData>;
  register: UseFormRegister<CreateProblemFormData>;
  errors: FieldErrors<CreateProblemFormData>;
}

export function SampleTestCasesField({ control, register, errors }: SampleTestCasesFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sampleTestCases",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">Sample Test Cases</Label>
          <p className="text-sm text-muted-foreground">Minimum 3 sample test cases required</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ input: "", output: "", explanation: "" })}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Sample
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Sample {index + 1}</h4>
              {fields.length > 3 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Input</Label>
                <Textarea
                  {...register(`sampleTestCases.${index}.input`)}
                  placeholder="Enter sample input..."
                  className="min-h-[80px] font-mono text-sm"
                />
                {errors.sampleTestCases?.[index]?.input && (
                  <p className="text-xs text-red-500">{errors.sampleTestCases[index]?.input?.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Output</Label>
                <Textarea
                  {...register(`sampleTestCases.${index}.output`)}
                  placeholder="Enter expected output..."
                  className="min-h-[80px] font-mono text-sm"
                />
                {errors.sampleTestCases?.[index]?.output && (
                  <p className="text-xs text-red-500">{errors.sampleTestCases[index]?.output?.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Explanation (optional)</Label>
              <Textarea
                {...register(`sampleTestCases.${index}.explanation`)}
                placeholder="Explain how this sample works..."
                className="min-h-[60px] text-sm"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {errors.sampleTestCases?.message && (
        <p className="text-sm text-red-500">{errors.sampleTestCases.message}</p>
      )}
    </div>
  );
}
