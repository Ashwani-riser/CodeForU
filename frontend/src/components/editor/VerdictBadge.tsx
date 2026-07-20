"use client";

import { cn } from "@/lib/utils";
import { VERDICT_CONFIG } from "@/constants";

interface VerdictBadgeProps {
  verdict: string;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "default";
}

export function VerdictBadge({ verdict, className, showIcon = true, size = "default" }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG["Pending"];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium",
        config.color,
        config.bg,
        config.border,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-xs",
        verdict === "Pending" && "animate-pulse",
        className
      )}
    >
      {showIcon && <Icon className={cn("h-3.5 w-3.5", verdict === "Pending" && "animate-spin")} />}
      {verdict}
    </span>
  );
}
