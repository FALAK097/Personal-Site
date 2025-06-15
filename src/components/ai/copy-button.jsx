"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, CopyIcon } from "../icons";

export const CopyButton = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer",
        copied && "opacity-100",
        className
      )}
      title={copied ? "Copied!" : "Copy message"}
    >
      {copied ? (
        <CheckCheckIcon className="h-3 w-3 text-green-600" />
      ) : (
        <CopyIcon className="h-3 w-3 text-purple-600 dark:text-purple-400" />
      )}
    </Button>
  );
};
