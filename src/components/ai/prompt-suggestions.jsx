"use client";

import { Button } from "@/components/ui/button";

const defaultSuggestions = [
  { text: "Tell me about Falak's experience" },
  { text: "What are Falak's skills?" },
  { text: "What projects has Falak worked on?" },
  { text: "What is Falak's educational background?" },
];

export function PromptSuggestions({
  suggestions = defaultSuggestions,
  onSuggestionClick,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.text}
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          className="flex items-center gap-2 whitespace-nowrap rounded-full hover:bg-transparent border-purple-200 dark:border-purple-700 text-primary transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <span className="text-xs">{suggestion.text}</span>
        </Button>
      ))}
    </div>
  );
}
