"use client";

import { useEffect, useState } from "react";
import { uniqueVisitors } from "@/actions/unique-visitors";
import { SocialLinks } from "@/components/social-links";
import { HeartIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

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
  const [mumbaiTime, setMumbaiTime] = useState({ time: "" });

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

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setMumbaiTime({
        time: timeFormatter.format(now),
      });
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Made with love */}
            <div className="text-sm text-foreground/60 flex items-center gap-1 order-3 md:order-1">
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

            {/* Center section - Time & Social Links */}
            <div className="flex flex-col items-center gap-3 order-1 md:order-2 md:flex-row md:gap-6">
              <div className="text-sm text-foreground/60 flex items-center">
                Mumbai ·{" "}
                <span className="flex overflow-hidden ml-1">
                  {mumbaiTime.time ? (
                    mumbaiTime.time.split("").map((char, index) => (
                      <span key={index} className="inline-grid">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={`${index}-${char}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                            className="col-start-1 row-start-1"
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    ))
                  ) : (
                    <span>Loading...</span>
                  )}
                </span>
              </div>
              <SocialLinks />
            </div>

            {/* Visitors count */}
            <div className="text-sm text-foreground/60 order-2 md:order-3">
              {uniqueVisitorsCount !== null
                ? `${uniqueVisitorsCount.toLocaleString()} Visitors`
                : "Loading visitors..."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
