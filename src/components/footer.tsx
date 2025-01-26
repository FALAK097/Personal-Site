"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function Footer() {
  const [views, setViews] = useState(1901)

  useEffect(() => {
    // Add view counter logic here
    const getViews = async () => {
      // Fetch views from your analytics service
    }
    getViews()
  }, [])

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-foreground/60">Made with ❤️ by Falak Gala</p>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Link href="/newsletter" className="text-foreground/60 hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Newsletter</span>
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <div className="text-sm text-foreground/60">{views.toLocaleString()} Visitors</div>
        </div>
      </div>
    </footer>
  )
}

