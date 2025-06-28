"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { smoothScrollTo } from "./smooth-scroll-to";
import { ArrowDownIcon } from "../icons";

const ChatMessageList = React.forwardRef(
  ({ className, children, smooth = true, ...props }, _ref) => {
    const { scrollRef, isAtBottom, disableAutoScroll } = useAutoScroll({
      smooth,
      content: children,
    });

    const handleScrollToBottom = () => {
      if (scrollRef.current) {
        smoothScrollTo(scrollRef.current, {
          duration: 1000,
          offset: 0,
        });
      }
    };

    return (
      <div className="relative w-full h-full">
        <div
          className={`flex flex-col w-full h-full p-4 overflow-y-auto ${className}`}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          {...props}
        >
          <div className="flex flex-col gap-4">{children}</div>
        </div>

        {!isAtBottom && (
          <Button
            onClick={handleScrollToBottom}
            size="icon"
            variant="outline"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer"
            aria-label="Scroll to bottom"
          >
            <ArrowDownIcon className="h-4 w-4 text-primary" />
          </Button>
        )}
      </div>
    );
  }
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
