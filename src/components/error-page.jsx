"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const ErrorPage = ({ error, reset }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-background/50 overflow-x-hidden flex justify-center items-center relative p-4">
      <div className="absolute flex flex-col justify-center items-center w-full max-w-2xl z-[100]">
        <div
          className={`flex flex-col items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-8">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse [animation-duration:2s]" />
            <div className="absolute inset-4 bg-purple-500/30 rounded-full animate-pulse [animation-duration:2s] [animation-delay:0.2s]" />
            <div className="absolute inset-8 bg-purple-500/40 rounded-full animate-pulse [animation-duration:2s] [animation-delay:0.4s]" />
            <div className="absolute inset-12 bg-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-center px-4">
            Oops! Something went wrong
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-md text-center mb-6 md:mb-8 px-4">
            We encountered an unexpected issue. Don't worry, we're on it!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-6">
            <button
              onClick={reset}
              className="w-full sm:w-auto group bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:scale-105"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto group bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:scale-105"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Go Back Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
