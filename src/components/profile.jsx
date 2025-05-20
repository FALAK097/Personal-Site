"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Profile() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-5xl gap-6 px-4 mx-auto mb-12">
      <div className="flex flex-col items-center w-full gap-6 md:flex-row">
        <div
          className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-2 border-border overflow-hidden transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            fill
            priority
            alt="Profile picture"
            className="object-cover"
            src="/placeholder.svg"
          />
        </div>

        <div
          className={`flex-1 text-center space-y-3 transform transition-all duration-1000 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl tracking-tight sm:text-3xl md:text-3xl">
              Hey I’m Falak
            </h1>
          </div>

          <p className="text-base leading-relaxed break-words sm:text-lg md:text-xl text-foreground/90">
            A Full Stack Developer whipping up clever solutions and wrestling
            with tricky challenges—because who doesn’t love a good tech puzzle?
          </p>

          <p className="text-sm leading-relaxed break-words sm:text-base md:text-lg text-foreground/70">
            This is my quirky web nook for spilling my{" "}
            <Link
              className="text-purple-400 transition-colors hover:underline hover:text-purple-300"
              href="/blog"
            >
              learnings
            </Link>{" "}
            and{" "}
            <Link
              className="text-purple-400 transition-colors hover:underline hover:text-purple-300"
              href="/projects"
            >
              projects
            </Link>
            !
          </p>

          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" className="group" asChild>
                <Link href="/hireme">
                  <span className="w-4 h-4 bg-green-500 rounded-full sm:w-5 sm:h-5 opacity-60 me-2" />
                  Available for Hire
                </Link>
              </Button>
              <span className="text-gray-400">OR</span>
              <div className="relative group">
                <Button variant="outline" className="group" asChild>
                  <Link href="mailto:falakgala09@gmail.com">
                    <MailIcon
                      className="-ms-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Email Me
                    <ArrowRightIcon
                      className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <div className="absolute hidden px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded-lg shadow-lg sm:text-sm left-1/2 bottom-full group-hover:block">
                  falakgala09@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
