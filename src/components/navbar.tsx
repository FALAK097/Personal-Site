"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/hire-me", label: "HireMe" },
  ]

  return (
    <header className="border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold hover:text-primary transition-colors">
          Falak Gala
        </Link>

        <div className="flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-foreground/60 hover:text-foreground transition-colors",
                "after:absolute after:left-0 after:right-0 after:-bottom-1",
                "after:h-[2px] after:bg-foreground",
                "after:scale-x-0 hover:after:scale-x-100",
                "after:transition-transform after:duration-300",
                pathname === href && "text-foreground after:scale-x-100",
              )}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

