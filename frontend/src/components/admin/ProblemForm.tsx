"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createProblemSchema, type CreateProblemFormData } from "@/schemas";
import { problemService } from "@/services/problem.service";
import { testcaseService } from "@/services/testcase.service";
import { SampleTestCasesField } from "./SampleTestCasesField";
import { HiddenTestCasesField } from "./HiddenTestCasesField";
import type { Problem } from "@/types/problem.types";
import Link from "next/link";

interface ProblemFormProps {
  mode: "create" | "edit";
  initialData?: Problem;
  initialHiddenTestCases?: { input: string; expectedOutput: string }[];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProblemForm({ mode, initialData, initialHiddenTestCases = [] }: ProblemFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [hiddenTestCases, setHiddenTestCases] = useState(initialHiddenTestCases);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProblemFormData>({
    resolver: zodResolver(createProblemSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          difficulty: initialData.difficulty,
          tags: initialData.tags,
          statement: initialData.statement,
          constraints: initialData.constraints,
          inputFormat: initialData.inputFormat,
          outputFormat: initialData.outputFormat,
          explanation: "",
          sampleTestCases:
            initialData.sampleTestCases?.length >= 3
              ? initialData.sampleTestCases
              : [
                  { input: "", output: "", explanation: "" },
                  { input: "", output: "", explanation: "" },
                  { input: "", output: "", explanation: "" },
                ],
        }
      : {
          title: "",
          slug: "",
          difficulty: undefined,
          tags: [],
          statement: "",
          constraints: "",
          inputFormat: "",
          outputFormat: "",
          explanation: "",
          sampleTestCases: [
            { input: "", output: "", explanation: "" },
            { input: "", output: "", explanation: "" },
            { input: "", output: "", explanation: "" },
          ],
        },
  });

  const title = watch("title");
  const tags = watch("tags");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed], { shouldValidate: true });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: CreateProblemFormData) => {
    setIsSubmitting(true);
    try {
      let problemId: string;

      if (mode === "create") {
        const res = await problemService.create(data);
        problemId = res.data._id;
        toast.success("Problem created successfully");
      } else {
        await problemService.update(initialData!._id, data);
        problemId = initialData!._id;
        toast.success("Problem updated successfully");
      }

      for (const tc of hiddenTestCases) {
        if (tc.input.trim() && tc.expectedOutput.trim()) {
          await testcaseService.create({
            problemId,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: true,
          });
        }
      }

      router.push("/admin/problems");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || `Failed to ${mode} problem`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/problems">
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {mode === "create" ? "Create Problem" : "Edit Problem"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "create" ? "Add a new problem to the judge" : `Editing "${initialData?.title}"`}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSubmitting ? "Saving..." : mode === "create" ? "Create Problem" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Title</Label>
                    <Input {...register("title")} placeholder="e.g. Two Sum" />
                    {errors.title && (
                      <p className="text-xs text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Slug</Label>
                    <Input
                      {...register("slug")}
                      placeholder="e.g. two-sum"
                      onBlur={() => {
                        const currentSlug = watch("slug");
                        if (!currentSlug && title) {
                          setValue("slug", slugify(title), { shouldValidate: true });
                        }
                      }}
                    />
                    {errors.slug && (
                      <p className="text-xs text-red-500">{errors.slug.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Difficulty</Label>
                  <Controller
                    control={control}
                    name="difficulty"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value ?? ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.difficulty && (
                    <p className="text-xs text-red-500">{errors.difficulty.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Type a tag and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-0.5 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {errors.tags && (
                    <p className="text-xs text-red-500">{errors.tags.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Problem Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Statement</Label>
                  <Textarea
                    {...register("statement")}
                    placeholder="Write the problem statement here..."
                    className="min-h-[200px]"
                  />
                  {errors.statement && (
                    <p className="text-xs text-red-500">{errors.statement.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Constraints</Label>
                  <Textarea
                    {...register("constraints")}
                    placeholder="e.g. 1 <= n <= 10^5"
                    className="min-h-[80px]"
                  />
                  {errors.constraints && (
                    <p className="text-xs text-red-500">{errors.constraints.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Input Format</Label>
                    <Textarea
                      {...register("inputFormat")}
                      placeholder="Describe the input format..."
                      className="min-h-[80px]"
                    />
                    {errors.inputFormat && (
                      <p className="text-xs text-red-500">{errors.inputFormat.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Output Format</Label>
                    <Textarea
                      {...register("outputFormat")}
                      placeholder="Describe the output format..."
                      className="min-h-[80px]"
                    />
                    {errors.outputFormat && (
                      <p className="text-xs text-red-500">{errors.outputFormat.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sample Test Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  control={control}
                  name="sampleTestCases"
                  render={({ field }) => (
                    <SampleTestCasesField
                      control={control}
                      register={register}
                      errors={errors}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Hidden Test Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <HiddenTestCasesField value={hiddenTestCases} onChange={setHiddenTestCases} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Title:</span>{" "}
                  <span className="font-medium">{title || "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Slug:</span>{" "}
                  <span className="font-mono text-xs">{watch("slug") || "—"}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-muted-foreground">Tags:</span>{" "}
                  <span>{tags.length > 0 ? tags.join(", ") : "—"}</span>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Sample Cases: {watch("sampleTestCases")?.length || 0} | Hidden Cases:{" "}
                  {hiddenTestCases.length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
