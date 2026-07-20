export interface SampleTestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  statement: string;
  difficulty: "Easy" | "Medium" | "Hard";
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleTestCases: SampleTestCase[];
  tags: string[];
  createdBy: string | { _id: string; username: string; fullName?: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProblemListItem {
  _id: string;
  title: string;
  slug: string;
  difficulty: string;
  tags: string[];
}

export interface PaginatedProblems {
  problems: ProblemListItem[];
  pagination: {
    totalProblems: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ProblemFilters {
  search: string;
  difficulty: string;
  tags: string;
  page: number;
  limit: number;
  sort: string;
  order: "asc" | "desc";
}

export interface CreateProblemPayload {
  title: string;
  slug: string;
  statement: string;
  difficulty: "Easy" | "Medium" | "Hard";
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleTestCases: SampleTestCase[];
  tags: string[];
}

export interface CreateTestCasePayload {
  problemId: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface TestCase {
  _id: string;
  problemId: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  createdAt: string;
}
