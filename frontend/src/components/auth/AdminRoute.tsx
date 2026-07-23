"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { PageSkeleton } from "@/components/common/LoadingSkeleton";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/403");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading]);

  if (isLoading) return <PageSkeleton />;
  if (!isAuthenticated || !isAdmin) return null;

  return <>{children}</>;
}
