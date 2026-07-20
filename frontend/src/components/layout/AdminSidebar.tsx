"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileCode,
  PlusCircle,
  Trophy,
  PlusSquare,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/problems", label: "Problems", icon: FileCode },
  { href: "/admin/problems/new", label: "Create Problem", icon: PlusCircle },
  { href: "/admin/contests", label: "Contests", icon: Trophy },
  { href: "/admin/contests/new", label: "Create Contest", icon: PlusSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
