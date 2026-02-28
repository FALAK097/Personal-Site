"use client";

import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GitHubCalendarChart = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <TooltipProvider>
        <GitHubCalendar
          username="falak097"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          showWeekdayLabels={false}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          theme={{
            light: ["#f4ece8", "#d6bba8", "#a15d3a", "#8c4c2d", "#5e3321"],
            dark: ["#2a160e", "#5e3321", "#8c4c2d", "#a15d3a", "#c49981"],
          }}
        renderBlock={(block, activity) => {
          const date = new Date(activity.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const tooltip = `${activity.count} contribution${
            activity.count !== 1 ? "s" : ""
          } on ${date}`;

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <rect {...block.props} />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          );
        }}
          />
      </TooltipProvider>
    );
};
