"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { askFalakAI } from "@/actions/ask-ai";
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "./expandable-chat";
import { ChatMessageList } from "./chat-message-list";
import { ChatBubble, ChatBubbleMessage } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { PromptSuggestions } from "./prompt-suggestions";
import { SendIcon } from "../icons";
import { Button } from "@/components/ui/button";

export const AskAIWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi! I'm Falak's AI Assistant. Ask me anything about him!",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: question,
        sender: "user",
      },
    ]);
    setInput("");

    startTransition(async () => {
      const res = await askFalakAI(question);
      if (!res || typeof res !== "string") {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: "Something went wrong. Please try again.",
            sender: "ai",
          },
        ]);
        return;
      }

      let i = 0;
      let answer = "";
      intervalRef.current = setInterval(() => {
        answer += res[i];
        i++;
        if (i >= res.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: prev.length,
            content: answer,
            sender: "ai",
          },
        ]);
      }, 25);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "",
          sender: "ai",
        },
      ]);
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.text);
  };

  const showSuggestions = messages.length <= 1 && !input.trim();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ExpandableChat
        open={open}
        onOpenChange={setOpen}
        size="lg"
        position="bottom-right"
      >
        <ExpandableChatBody>
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter className="space-y-4">
          {showSuggestions && (
            <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
          )}
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl border border-purple-200 dark:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent p-1 shadow-sm"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              className="min-h-12 resize-none rounded-xl bg-transparent border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0 justify-end">
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isPending}
                className="gap-1.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <SendIcon className="size-3.5" />
                Ask
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  );
};
