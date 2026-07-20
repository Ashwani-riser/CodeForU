import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (
          !pathname.startsWith("/login") &&
          !pathname.startsWith("/signup") &&
          !pathname.startsWith("/forgot-password") &&
          !pathname.startsWith("/reset-password") &&
          !pathname.startsWith("/verify-email") &&
          pathname !== "/"
        ) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
