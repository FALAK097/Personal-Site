"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [uniqueVisitors, setUniqueVisitors] = useState(null);

  useEffect(() => {
    const visitorId = generateVisitorId();
    if (!visitorId) return;

    const fetchUniqueVisitors = async () => {
      try {
        const res = await fetch(`/api/views?visitorId=${visitorId}`);
        const data = await res.json();
        if (data?.uniqueVisitors) {
          setUniqueVisitors(data.uniqueVisitors);
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
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Email</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://x.com/FalakGala097"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://github.com/Falak097"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              className="transition-colors text-foreground/60 hover:text-foreground"
              href="https://linkedin.com/in/falak-gala"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <div className="text-xs text-foreground/60 sm:text-sm">
            {uniqueVisitors !== null
              ? uniqueVisitors.toLocaleString() + " Unique Visitors"
              : "Loading visitors..."}
          </div>
        </div>
      </div>
    </footer>
  );
}
