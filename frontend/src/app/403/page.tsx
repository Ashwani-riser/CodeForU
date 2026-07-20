"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <ShieldX className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You don&apos;t have permission to access this page. This area is restricted to administrators.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Link href="/problems">
            <Button variant="outline">Browse Problems</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
