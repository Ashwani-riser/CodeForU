import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type { User, AuthResponse, RegisterPayload, LoginPayload } from "@/types/user.types";

export const authService = {
  async register(data: RegisterPayload) {
    const res = await api.post<ApiResponse<AuthResponse>>("/users/register", data);
    return res.data;
  },

  async login(data: LoginPayload) {
    const res = await api.post<ApiResponse<AuthResponse>>("/users/login", data);
    return res.data;
  },

  async logout() {
    const res = await api.post<ApiResponse<null>>("/users/logout");
    return res.data;
  },

  async getCurrentUser() {
    const res = await api.get<ApiResponse<User>>("/users/currentUser");
    return res.data;
  },

  async forgotPassword(email: string) {
    const res = await api.post<ApiResponse<null>>("/users/forgot-password", { email });
    return res.data;
  },

  async resetPassword(token: string, password: string) {
    const res = await api.post<ApiResponse<null>>(`/users/reset-password/${token}`, { password });
    return res.data;
  },

  async verifyEmail(token: string) {
    const res = await api.get<ApiResponse<null>>(`/users/verify-email/${token}`);
    return res.data;
  },

  async resendVerification(email: string) {
    const res = await api.post<ApiResponse<null>>("/users/resend-verification", { email });
    return res.data;
  },
};
