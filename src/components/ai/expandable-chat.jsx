"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SparklesIcon, XIcon } from "../icons";

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed:
      "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
  },
};

const ExpandableChat = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(
        `fixed ${chatConfig.positions[position]} z-50 mr-2`,
        className
      )}
      {...props}
    >
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col bg-background border sm:rounded-lg shadow-xl overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto backdrop-blur-sm",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className
        )}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:hidden hover:bg-purple-100 dark:hover:bg-purple-900"
          onClick={toggleChat}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <ExpandableChatToggle
        icon={icon}
        isOpen={isOpen}
        toggleChat={toggleChat}
      />
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatBody = ({ className, ...props }) => (
  <div
    className={cn(
      "flex-grow overflow-y-auto bg-gradient-to-b from-purple-50/30 to-white dark:from-purple-950/30 dark:to-background",
      className
    )}
    {...props}
  />
);

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter = ({ className, ...props }) => (
  <div className={cn("p-4", className)} {...props} />
);

ExpandableChatFooter.displayName = "ExpandableChatFooter";

const ExpandableChatToggle = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "w-12 h-12 cursor-pointer rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 bg-transparent hover:bg-transparent text-primary",
      className
    )}
    {...props}
  >
    {isOpen ? (
      <XIcon className="h-6 w-6" />
    ) : (
      icon || <SparklesIcon className="h-6 w-6" />
    )}
  </Button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export { ExpandableChat, ExpandableChatBody, ExpandableChatFooter };
