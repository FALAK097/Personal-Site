"use client";

import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSignIcon, XIcon } from "./icons";

export function Newsletter({ className = "" }) {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Subscribing:", email);
    setIsSubscribed(true);
  };

  if (!isVisible) return null;

  if (isSubscribed) {
    return (
      <div
        className={`relative rounded-lg p-6 ${
          theme === "dark" ? "bg-primary/10" : "bg-primary/5"
        } ${className}`}
      >
        <Button
          className="absolute right-2 top-2"
          size="icon"
          variant="ghost"
          onClick={() => setIsVisible(false)}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Subscribed!</h2>
          <p className="text-muted-foreground">
            You should receive a confirmation email shortly! 📬 😊
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg p-6 ${
        theme === "dark" ? "bg-primary/10" : "bg-primary/5"
      } ${className}`}
    >
      <Button
        className="absolute right-2 top-2"
        size="icon"
        variant="ghost"
        onClick={() => setIsVisible(false)}
      >
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">
          Subscribe for musings on indie dev, software, and life
        </h2>
        <AtSignIcon className="w-6 h-6" />
      </div>

      <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
        <Input
          required
          className="flex-1"
          placeholder="me@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}
