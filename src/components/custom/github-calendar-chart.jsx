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
            light: ["#f3e8ff", "#d8b4fe", "#a855f7", "#9333ea", "#6b21a8"],
            dark: ["#2d1b4e", "#582a9d", "#7c3aed", "#9333ea", "#c084fc"],
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
