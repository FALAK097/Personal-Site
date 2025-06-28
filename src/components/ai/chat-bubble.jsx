"use client";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export function ChatBubble({ variant = "received", className, children }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-4",
        variant === "sent" && "flex-row-reverse",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ChatBubbleMessage({
  variant = "received",
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-3 max-w-[80%] shadow-sm group relative",
        variant === "sent"
          ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
          : "border border-purple-100 dark:border-purple-800",
        className
      )}
    >
      <>
        <div className="pr-8">{children}</div>
        {variant === "received" && typeof children === "string" && children && (
          <div className="absolute top-2 right-2">
            <CopyButton text={children} />
          </div>
        )}
      </>
    </div>
  );
}
