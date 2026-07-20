"use client";

import { RotateCcw, Play, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LanguageSelector } from "./LanguageSelector";
import { FullscreenButton } from "./FullscreenButton";
import { CopyButton } from "./CopyButton";
import { FontSizeSelector } from "./FontSizeSelector";

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  code: string;
}

export function EditorToolbar({
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  onReset,
  isRunning,
  isSubmitting,
  code,
}: EditorToolbarProps) {
  const isAnyRunning = isRunning || isSubmitting;

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-card/50">
      <div className="flex items-center gap-2">
        <LanguageSelector value={language} onChange={onLanguageChange} />
      </div>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onReset}
              />
            }
          >
            <RotateCcw className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent><p>Reset code</p></TooltipContent>
        </Tooltip>

        <CopyButton text={code} />
        <FontSizeSelector />
        <FullscreenButton />

        <div className="w-px h-5 bg-border/50 mx-1" />

        <Button
          size="sm"
          onClick={onRun}
          disabled={isAnyRunning}
          className="h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
        >
          {isRunning ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
          Run
        </Button>
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={isAnyRunning}
          className="h-8 gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-medium shadow-md shadow-violet-500/20"
        >
          {isSubmitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          Submit
        </Button>
      </div>
    </div>
  );
}
