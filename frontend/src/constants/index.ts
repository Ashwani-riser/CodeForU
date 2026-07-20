export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  PROBLEMS: "/problems",
  PROBLEM_DETAIL: "/problems",
  CONTESTS: "/contests",
  CONTEST_DETAIL: "/contests",
  SUBMISSIONS: "/submissions",
  PLAYGROUND: "/playground",
  PROFILE: "/profile",
  ADMIN: "/admin",
  ADMIN_PROBLEMS: "/admin/problems",
  ADMIN_CREATE_PROBLEM: "/admin/problems/new",
  ADMIN_EDIT_PROBLEM: "/admin/problems",
  ADMIN_CONTESTS: "/admin/contests",
  ADMIN_CREATE_CONTEST: "/admin/contests/new",
} as const;

export const DIFFICULTY_COLORS = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
} as const;

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Loader2,
  AlertOctagon,
} from "lucide-react";

export const VERDICT_COLORS = {
  Accepted: "text-emerald-400 bg-emerald-400/10",
  "Wrong Answer": "text-red-400 bg-red-400/10",
  "Compilation Error": "text-orange-400 bg-orange-400/10",
  "Runtime Error": "text-red-400 bg-red-400/10",
  "Time Limit Exceeded": "text-amber-400 bg-amber-400/10",
  Pending: "text-slate-400 bg-slate-400/10",
} as const;

export const VERDICT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: typeof CheckCircle2 }> = {
  Accepted: { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", icon: CheckCircle2 },
  "Wrong Answer": { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", icon: XCircle },
  "Compilation Error": { color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", icon: AlertOctagon },
  "Runtime Error": { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", icon: AlertTriangle },
  "Time Limit Exceeded": { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", icon: Clock },
  Pending: { color: "text-slate-400", bg: "bg-slate-400/10", border: "border-slate-400/20", icon: Loader2 },
};

export const LANGUAGES = [
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "c", label: "C", monaco: "c" },
  { value: "java", label: "Java", monaco: "java" },
  { value: "python", label: "Python", monaco: "python" },
] as const;

export const DEFAULT_CODE = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`,
  java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  python: `# Your code here
`,
} as const;
