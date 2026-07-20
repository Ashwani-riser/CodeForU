export interface Submission {
  _id: string;
  userId: string | { _id: string; username: string; fullName?: string };
  problemId: string | { _id: string; title: string; difficulty: string; slug?: string };
  contestId: string | { _id: string; title: string } | null;
  language: "c" | "cpp" | "java" | "python";
  sourceCode?: string;
  verdict: "Pending" | "Accepted" | "Wrong Answer" | "Compilation Error" | "Runtime Error" | "Time Limit Exceeded";
  executionTime: number;
  compileError: string | null;
  createdAt: string;
}

export interface SubmissionListResponse {
  submissions: Submission[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface RunCodePayload {
  language: string;
  sourceCode: string;
  input?: string;
}

export interface RunCodeResponse {
  output: string;
  executionTime: number;
  success: boolean;
  type?: string;
  error?: string;
}

export interface SubmitCodePayload {
  problemId: string;
  language: string;
  sourceCode: string;
}
