/* eslint-disable no-unused-vars */
"use client";

import {Github, Linkedin, Mail, Twitter} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";

export function Footer() {
  const [views, setViews] = useState(1901);

  useEffect(() => {
    // Add view counter logic here
    const getViews = async () => {
      // Fetch views from your analytics service
    };

    getViews();
  }, []);

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-foreground/60">Made with ❤️ by Falak Gala</p>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Link
              className="text-foreground/60 hover:text-foreground transition-colors"
              href="/newsletter"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Newsletter</span>
            </Link>
            <a
              className="text-foreground/60 hover:text-foreground transition-colors"
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              className="text-foreground/60 hover:text-foreground transition-colors"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              className="text-foreground/60 hover:text-foreground transition-colors"
              href="https://linkedin.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <div className="text-sm text-foreground/60">{views.toLocaleString()} Visitors</div>
        </div>
      </div>
    </footer>
  );
}
