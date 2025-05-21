"use client";

import GitHubCalendar from "react-github-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GitHubCalendarChart = () => {
  return (
    <TooltipProvider>
      <GitHubCalendar
        username="falak097"
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        showWeekdayLabels={false}
        theme={{
          dark: ["hsl(0, 0%, 20%)", "#9B7EDE", "#a855f7", "#ff66ff", "#6B4EAA"],
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
