import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type { CreateTestCasePayload, TestCase } from "@/types/problem.types";

export const testcaseService = {
  async create(data: CreateTestCasePayload) {
    const res = await api.post<ApiResponse<TestCase>>("/testcases", data);
    return res.data;
  },

  async getByProblemId(problemId: string) {
    const res = await api.get<ApiResponse<TestCase[]>>(`/testcases/${problemId}`);
    return res.data;
  },
};
