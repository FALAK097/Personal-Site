"use client";

import { useEffect, useState } from "react";
import { getBookmarks } from "@/actions/bookmarks";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridIcon, ListIcon, TrendingUpIcon } from "./icons";

export const BookmarksList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [viewMode, setViewMode] = useState("moodboard");
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    getBookmarks().then(setBookmarks).catch(console.error);
  }, []);

  const allTags = [
    "all",
    ...new Set(bookmarks.flatMap((bookmark) => bookmark.tags || [])),
  ];

  const filteredBookmarks =
    activeTag === "all"
      ? bookmarks
      : bookmarks.filter((bookmark) => bookmark.tags?.includes(activeTag));

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 w-full">
          <Tabs
            value={activeTag}
            onValueChange={setActiveTag}
            className="flex-1 min-w-0"
          >
            <TabsList className="bg-background h-auto p-1 flex flex-wrap">
              {allTags.map((tag) => (
                <TabsTrigger
                  key={tag}
                  value={tag}
                  className="px-3 py-1.5 data-[state=active]:bg-white data-[state=active]:border-b-purple-400 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-black dark:data-[state=active]:text-white dark:data-[state=active]:border-b-purple-400"
                >
                  {tag}
                  {tag === "all" ? (
                    <span className="ml-1 text-xs text-purple-500 font-semibold">
                      ({bookmarks.length})
                    </span>
                  ) : (
                    <span className="ml-1 text-xs text-purple-400 font-medium">
                      ({bookmarks.filter((b) => b.tags?.includes(tag)).length})
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-1 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setViewMode("moodboard")}
                    className={cn(
                      "p-2 rounded-md",
                      viewMode === "moodboard"
                        ? "bg-purple-800 text-purple-200"
                        : "text-gray-500"
                    )}
                    aria-label="Moodboard"
                  >
                    <GridIcon size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Moodboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-md",
                      viewMode === "list"
                        ? "bg-purple-800 text-purple-200"
                        : "text-gray-500"
                    )}
                    aria-label="List"
                  >
                    <ListIcon size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>List</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {viewMode === "moodboard" ? (
        <div className="masonry-grid">
          {filteredBookmarks.map((bookmark) => (
            <MoodboardCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      ) : (
        <div>
          {filteredBookmarks.map((bookmark) => (
            <ListCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
};

const MoodboardCard = ({ bookmark }) => {
  const isLarge = bookmark.featured || Math.random() > 0.7;

  return (
    <Card
      className={cn(
        "masonry-item group overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        isLarge ? "masonry-item-large" : ""
      )}
    >
      <a
        href={bookmark.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-purple-100 dark:bg-purple-900">
          {bookmark.cover ? (
            <img
              src={bookmark.cover || "/placeholder.svg"}
              alt={bookmark.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-300 to-purple-100 dark:from-purple-800 dark:to-purple-950">
              <Bookmark
                size={48}
                className="text-purple-500 dark:text-purple-300 opacity-50"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-1">
              <TrendingUpIcon size={14} />
              <span className="text-xs truncate">
                {new URL(bookmark.link).hostname}
              </span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-primary hover:text-purple-600 line-clamp-2 text-sm leading-tight">
            {bookmark.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {bookmark.tags &&
              bookmark.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </a>
    </Card>
  );
};

const ListCard = ({ bookmark }) => {
  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 border-b border-purple-100 dark:border-purple-800/50 last:border-b-0">
      <div className="flex-shrink-0">
        {bookmark.cover ? (
          <img
            src={bookmark.cover || "/placeholder.svg"}
            alt={bookmark.title}
            className="w-12 h-12 object-cover rounded-md shadow-sm border border-purple-200 dark:border-purple-700"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-purple-100 dark:from-purple-800 dark:to-purple-950 rounded-md flex items-center justify-center">
            <Bookmark
              size={20}
              className="text-purple-500 dark:text-purple-300 opacity-70"
            />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <a
              href={bookmark.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-primary hover:text-purple-600 transition-colors duration-200 line-clamp-1 block"
            >
              {bookmark.title}
            </a>

            <div className="flex items-center gap-2 mt-1">
              {bookmark.tags && bookmark.tags.length > 0 && (
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  #{bookmark.tags[0]}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <TrendingUpIcon size={12} />
                {new URL(bookmark.link).hostname}
              </span>
              {bookmark.createdAt && (
                <>
                  <span>•</span>
                  <span>
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
