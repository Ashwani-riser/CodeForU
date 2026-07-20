import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type { Contest, LeaderboardEntry } from "@/types/contest.types";

export const contestService = {
  async getAll() {
    const res = await api.get<ApiResponse<Contest[]>>("/contests");
    return res.data;
  },

  async getById(id: string) {
    const res = await api.get<ApiResponse<Contest>>(`/contests/${id}`);
    return res.data;
  },

  async create(data: {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    problems?: string[];
  }) {
    const res = await api.post<ApiResponse<Contest>>("/contests", data);
    return res.data;
  },

  async update(id: string, data: Partial<Contest>) {
    const res = await api.patch<ApiResponse<Contest>>(`/contests/${id}`, data);
    return res.data;
  },

  async delete(id: string) {
    const res = await api.delete<ApiResponse<{}>>(`/contests/${id}`);
    return res.data;
  },

  async register(id: string) {
    const res = await api.post<ApiResponse<Contest>>(`/contests/${id}/register`);
    return res.data;
  },

  async getLeaderboard(id: string) {
    const res = await api.get<ApiResponse<LeaderboardEntry[]>>(`/contests/${id}/leaderboard`);
    return res.data;
  },
};
