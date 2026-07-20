"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { contestService } from "@/services/contest.service";
import Link from "next/link";

const contestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

type ContestFormData = z.infer<typeof contestSchema>;

export default function CreateContestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContestFormData>({
    resolver: zodResolver(contestSchema),
  });

  const onSubmit = async (data: ContestFormData) => {
    setIsSubmitting(true);
    try {
      await contestService.create({
        title: data.title,
        description: data.description,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      });
      toast.success("Contest created successfully");
      router.push("/admin/contests");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create contest");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/contests">
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create Contest</h1>
            <p className="text-sm text-muted-foreground">Schedule a new programming contest</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input {...register("title")} placeholder="e.g. Weekly Contest #1" />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Description (optional)</Label>
                <Textarea {...register("description")} placeholder="Describe the contest..." className="min-h-[100px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start Time</Label>
                  <Input {...register("startTime")} type="datetime-local" />
                  {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>End Time</Label>
                  <Input {...register("endTime")} type="datetime-local" />
                  {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isSubmitting ? "Creating..." : "Create Contest"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
