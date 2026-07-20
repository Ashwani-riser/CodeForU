import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type {
  Submission,
  SubmissionListResponse,
  RunCodePayload,
  RunCodeResponse,
  SubmitCodePayload,
} from "@/types/submission.types";

export const submissionService = {
  async runCode(data: RunCodePayload) {
    const res = await api.post<ApiResponse<RunCodeResponse>>("/submissions/run", data);
    return res.data;
  },

  async submit(data: SubmitCodePayload) {
    const res = await api.post<ApiResponse<Submission>>("/submissions", data);
    return res.data;
  },

  async getMySubmissions() {
    const res = await api.get<ApiResponse<Submission[]>>("/submissions/my");
    return res.data;
  },

  async getAll(params?: Record<string, string>) {
    const query = new URLSearchParams(params).toString();
    const url = `/submissions${query ? `?${query}` : ""}`;
    const res = await api.get<ApiResponse<SubmissionListResponse>>(url);
    return res.data;
  },

  async getById(id: string) {
    const res = await api.get<ApiResponse<Submission>>(`/submissions/${id}`);
    return res.data;
  },
};
