"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </NextThemesProvider>
  );
}
