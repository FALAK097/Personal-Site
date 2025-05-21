"use client";

import { useEffect, useState } from "react";
import { AtSignIcon } from "./icons/at-sign";
import { TwitterIcon } from "./icons/twitter";
import { GithubIcon } from "./icons/github";
import { LinkedinIcon } from "./icons/linkedin";
import { uniqueVisitors } from "@/actions/unique-visitors";

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
          <div className="flex items-center gap-4">
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="mailto:falakgala09@gmail.com"
            >
              <AtSignIcon />
              <span className="sr-only">Email</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://x.com/FalakGala097"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterIcon />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://github.com/Falak097"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://linkedin.com/in/falak-gala"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
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
