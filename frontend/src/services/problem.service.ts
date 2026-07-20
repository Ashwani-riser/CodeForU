import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type {
  Problem,
  PaginatedProblems,
  ProblemFilters,
  CreateProblemPayload,
} from "@/types/problem.types";

export const problemService = {
  async getAll(filters?: Partial<ProblemFilters>) {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.difficulty) params.set("difficulty", filters.difficulty);
    if (filters?.tags) params.set("tags", filters.tags);
    if (filters?.page) params.set("page", String(filters.page));
    if (filters?.limit) params.set("limit", String(filters.limit));
    if (filters?.sort) params.set("sort", filters.sort);
    if (filters?.order) params.set("order", filters.order);

    const queryString = params.toString();
    const url = `/problems${queryString ? `?${queryString}` : ""}`;

    const res = await api.get<ApiResponse<PaginatedProblems>>(url);
    return res.data;
  },

  async getBySlug(slug: string) {
    const res = await api.get<ApiResponse<Problem>>(`/problems/${slug}`);
    return res.data;
  },

  async create(data: CreateProblemPayload) {
    const res = await api.post<ApiResponse<Problem>>("/problems", data);
    return res.data;
  },

  async update(id: string, data: Partial<CreateProblemPayload>) {
    const res = await api.patch<ApiResponse<Problem>>(`/problems/${id}`, data);
    return res.data;
  },

  async delete(id: string) {
    const res = await api.delete<ApiResponse<{}>>(`/problems/${id}`);
    return res.data;
  },
};
