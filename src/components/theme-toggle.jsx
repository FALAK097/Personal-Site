"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-50 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none bg-background";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("opacity-100");
    });

    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
    }, 250);

    setTimeout(() => {
      overlay.classList.remove("opacity-100");
      overlay.classList.add("opacity-0");
    }, 500);

    setTimeout(() => {
      document.body.removeChild(overlay);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleToggle}
      disabled={isTransitioning}
      className="cursor-pointer hover:bg-transparent mt-1 text-muted-foreground"
      aria-label="Toggle theme"
    >
      <SunIcon className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
