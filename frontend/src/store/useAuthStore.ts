import { create } from "zustand";
import type { User } from "@/types/user.types";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    }),

  fetchUser: async () => {
    try {
      const res = await authService.getCurrentUser();
      const user = res.data;
      set({
        user,
        isAuthenticated: true,
        isAdmin: user?.role === "admin",
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
    }
  },

  login: async (email, password) => {
    const res = await authService.login({ email, password });
    const user = res.data.user;
    set({
      user,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
    });
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    }
  },
}));
