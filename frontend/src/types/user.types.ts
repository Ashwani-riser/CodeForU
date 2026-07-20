import { Submission } from "./submission.types";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileData {
  user: User;
  stats: {
    totalSubmissions: number;
    acceptedSubmissions: number;
    solvedProblems: number;
    accuracy: number;
    solvedByDifficulty: {
      Easy: number;
      Medium: number;
      Hard: number;
    };
  };
  languageStats: { language: string; count: number }[];
  recentSubmissions: Submission[];
  heatmap: { date: string; count: number }[];
}
