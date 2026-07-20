"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  Trophy,
  Terminal,
  Menu,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: ROUTES.PROBLEMS, label: "Problems", icon: Code2 },
  { href: ROUTES.PLAYGROUND, label: "Playground", icon: Terminal },
  { href: ROUTES.CONTESTS, label: "Contests", icon: Trophy },
];

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-lg group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              {"</>"}
            </div>
            <span className="hidden sm:inline gradient-text">CodeForU</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-muted/70 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href={ROUTES.ADMIN}>
                  <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-border/50">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-9 w-9 rounded-full" />}>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 text-primary text-sm font-medium">
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="flex items-center gap-2 p-2">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href={`/profile/${user?.username}`} className="flex items-center gap-2" />}>
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem render={<Link href={ROUTES.ADMIN} className="flex items-center gap-2" />}>
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href={ROUTES.SIGNUP}>
                <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-violet-500/20">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      pathname.startsWith(link.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && isAdmin && (
                  <Link
                    href={ROUTES.ADMIN}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full border-border/50">
                        Login
                      </Button>
                    </Link>
                    <Link href={ROUTES.SIGNUP} onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
