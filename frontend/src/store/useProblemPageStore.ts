"use client";

import { create } from "zustand";

interface ProblemPageState {
  fontSize: number;
  setFontSize: (size: number) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const useProblemPageStore = create<ProblemPageState>((set) => ({
  fontSize: 15,
  setFontSize: (fontSize) => set({ fontSize }),
  isFullscreen: false,
  toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen })),
}));
