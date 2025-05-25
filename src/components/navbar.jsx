"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { XIcon } from "./icons";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/hire-me", label: "HireMe" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link
          href="/"
          className={cn(
            "text-xl font-semibold tracking-tight text-primary hover:scale-105 transition-transform doto-font"
          )}
        >
          Falak
        </Link>
        <div className="flex items-center gap-4">
          <div className="items-center hidden gap-6 md:flex">
            {links.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative text-sm text-foreground/60 hover:text-foreground transition-colors",
                  "after:absolute after:left-0 after:right-0 after:-bottom-1",
                  "after:h-[2px] after:bg-[#a855f7]",
                  "after:scale-x-0 hover:after:scale-x-100",
                  "after:transition-transform after:duration-300",
                  pathname === href && "text-foreground after:scale-x-100",
                  mounted && `animate-fade-in animate-delay-${index * 100}`
                )}
              >
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <button
            className="md:hidden text-muted-foreground cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 md:hidden animate-slide-down">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-foreground/80 text-base font-medium hover:text-foreground transition-colors",
                pathname === href && "text-foreground font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
