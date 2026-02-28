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
  rawMessage,
  children,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-3 max-w-[80%] shadow-sm group relative",
        variant === "sent"
          ? "bg-gradient-to-r from-clay-600 to-violet-600 text-white"
          : "border border-clay-100 dark:border-clay-800",
        className
      )}
    >
      <>
        <div className="pr-8">{children}</div>
        {variant === "received" && (rawMessage || (typeof children === "string" && children)) && (
          <div className="absolute top-2 right-2">
            <CopyButton text={rawMessage || children} />
          </div>
        )}
      </>
    </div>
  );
}
