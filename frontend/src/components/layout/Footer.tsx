"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-lg mb-3 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                {"</>"}
              </div>
              <span className="gradient-text">CodeForU</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A modern online judge platform for competitive programming.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.PROBLEMS} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Problems</Link></li>
              <li><Link href={ROUTES.PLAYGROUND} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Playground</Link></li>
              <li><Link href={ROUTES.CONTESTS} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Contests</Link></li>
              <li><Link href={ROUTES.SUBMISSIONS} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Submissions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.LOGIN} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Login</Link></li>
              <li><Link href={ROUTES.SIGNUP} className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Languages</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> C++</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-gray-400" /> C</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Java</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Python</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} <span className="gradient-text font-semibold">CodeForU</span>. All rights reserved.</span>
          <Terminal className="h-4 w-4 text-primary/40" />
        </div>
      </div>
    </footer>
  );
}
