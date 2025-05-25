"use client";

import { useEffect, useState } from "react";
import { uniqueVisitors } from "@/actions/unique-visitors";
import { SocialLinks } from "@/components/social-links";

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
      <div className="container flex flex-col items-center justify-between h-auto px-4 py-4 mx-auto sm:flex-row sm:h-16 sm:py-0">
        <p className="mb-4 text-xs text-center text-foreground/60 sm:mb-0 sm:text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Falak097"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Falak Gala
          </a>
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <SocialLinks />
          <div className="text-xs text-foreground/60 sm:text-sm">
            {uniqueVisitorsCount !== null
              ? uniqueVisitorsCount.toLocaleString() + " Unique Visitors"
              : "Loading visitors..."}
          </div>
        </div>
      </div>
    </footer>
  );
}
