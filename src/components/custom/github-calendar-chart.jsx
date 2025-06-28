"use client";

import GitHubCalendar from "react-github-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

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
          dark: ["hsl(0, 0%, 20%)", "#9B7EDE", "#a855f7", "#ff66ff", "#6b21a8"],
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

export function useGitHubStats(username = "Falak097") {
  const [stats, setStats] = useState({
    mostProductiveDay: null,
    mostProductiveHour: null,
    mostUsedLanguage: null,
    weeklyProductivity: [],
    hourlyActivity: [],
    languageDistribution: [],
    loading: true,
  });

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch(
        `https://api.github.com/users/${username}/events/public`
      );
      const events = await res.json();

      const dayCounts = Array(7).fill(0);
      const hourCounts = Array(24).fill(0);
      let recentCommit = null;
      const weekMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weekHours = Array(7).fill(0);
      const weekCommits = Array(7).fill(0);

      for (const event of events) {
        if (event.type === "PushEvent") {
          const date = new Date(event.created_at);
          dayCounts[date.getDay()]++;
          hourCounts[date.getHours()]++;
          weekCommits[date.getDay()]++;
          weekHours[date.getDay()] += 1;
          if (!recentCommit || date > recentCommit) recentCommit = date;
        }
      }

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const mostProductiveDayIdx = dayCounts.indexOf(Math.max(...dayCounts));
      const mostProductiveDay = days[mostProductiveDayIdx];

      const mostProductiveHourIdx = hourCounts.indexOf(Math.max(...hourCounts));
      const mostProductiveHour = mostProductiveHourIdx + ":00";

      const weeklyProductivity = weekMap.map((day, i) => ({
        day,
        commits: weekCommits[i],
        hours: weekHours[i],
      }));
      const hourlyActivity = hourCounts.map((activity, i) => ({
        hour: `${i}:00`,
        activity,
      }));

      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const repos = await reposRes.json();
      const langCounts = {};
      for (const repo of repos) {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      }
      const mostUsedLanguage =
        Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
      const languageDistribution = Object.entries(langCounts).map(
        ([name, value]) => ({
          name,
          value,
          color: "#8884d8",
        })
      );

      setStats({
        mostProductiveDay,
        mostProductiveHour,
        mostUsedLanguage,
        weeklyProductivity,
        hourlyActivity,
        languageDistribution,
        loading: false,
      });
    }
    fetchStats();
  }, [username]);

  return stats;
}
