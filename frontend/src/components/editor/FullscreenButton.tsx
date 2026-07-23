"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useProblemPageStore } from "@/store/useProblemPageStore";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useProblemPageStore();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-200"
            onClick={toggleFullscreen}
          />
        }
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </TooltipTrigger>
      <TooltipContent>
        <p>{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
