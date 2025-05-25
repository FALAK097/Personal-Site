"use client";

import { useEffect, useState } from "react";
import { uniqueVisitors } from "@/actions/unique-visitors";
import { SocialLinks } from "@/components/social-links";
import { HeartIcon } from "@/components/icons";

function generateVisitorId() {
  if (typeof window === "undefined") return null;
  const localStorageKey = "visitorId";
  let id = localStorage.getItem(localStorageKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(localStorageKey, id);
  }
  return id;
}

export function Footer() {
  const [uniqueVisitorsCount, setUniqueVisitorsCount] = useState(null);

  useEffect(() => {
    const visitorId = generateVisitorId();
    if (!visitorId) return;

    const fetchUniqueVisitors = async () => {
      try {
        const result = await uniqueVisitors(visitorId);
        if (result?.uniqueVisitors) {
          setUniqueVisitorsCount(result.uniqueVisitors);
        } else if (result?.error) {
          console.error("Server action error:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch unique visitors", error);
      }
    };

    fetchUniqueVisitors();
  }, []);

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-sm text-foreground/60 flex items-center gap-1">
          Made with <HeartIcon className="inline-flex w-4 h-4 text-red-500" />{" "}
          by{" "}
          <a
            href="https://github.com/Falak097"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Falak Gala
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
          <SocialLinks />
          <div className="text-sm text-foreground/60">
            {uniqueVisitorsCount !== null
              ? `${uniqueVisitorsCount.toLocaleString()} Unique Visitors`
              : "Loading visitors..."}
          </div>
        </div>
      </div>
    </footer>
  );
}
