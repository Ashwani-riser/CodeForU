"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services/auth.service";

export default function VerifyEmailPage() {
  const params = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.verifyEmail(params.token as string);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, [params.token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-xl">
          <CardContent className="p-8 text-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                <p className="text-muted-foreground">Verifying your email...</p>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
                <h2 className="text-xl font-bold">Email Verified!</h2>
                <p className="text-sm text-muted-foreground">Your email has been verified. You can now log in.</p>
                <Link href="/login">
                  <Button className="w-full">Go to Login</Button>
                </Link>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h2 className="text-xl font-bold">Verification Failed</h2>
                <p className="text-sm text-muted-foreground">
                  The verification link is invalid or has expired.
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Back to Login</Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
