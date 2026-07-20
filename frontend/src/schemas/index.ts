import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const sampleTestCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().optional(),
});

export const hiddenTestCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  expectedOutput: z.string().min(1, "Expected output is required"),
});

export const createProblemSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    message: "Please select a difficulty",
  }),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required"),
  statement: z.string().min(10, "Statement must be at least 10 characters"),
  constraints: z.string().min(1, "Constraints are required"),
  inputFormat: z.string().min(1, "Input format is required"),
  outputFormat: z.string().min(1, "Output format is required"),
  explanation: z.string().optional(),
  sampleTestCases: z
    .array(sampleTestCaseSchema)
    .min(3, "At least 3 sample test cases are required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateProblemFormData = z.infer<typeof createProblemSchema>;
export type SampleTestCaseFormData = z.infer<typeof sampleTestCaseSchema>;
export type HiddenTestCaseFormData = z.infer<typeof hiddenTestCaseSchema>;
