"use client";

import { AdminRoute } from "@/components/auth/AdminRoute";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminRoute>
  );
}
