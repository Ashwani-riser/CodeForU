import api from "./api";
import type { ApiResponse } from "@/types/api.types";
import type { ProfileData } from "@/types/user.types";

export const profileService = {
  async getCurrentProfile() {
    const res = await api.get<ApiResponse<ProfileData>>("/users/profile");
    return res.data;
  },

  async getPublicProfile(username: string) {
    const res = await api.get<ApiResponse<ProfileData>>(`/users/profile/${username}`);
    return res.data;
  },
};
