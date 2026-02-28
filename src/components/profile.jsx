"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/animation";
import { Button } from "./ui/button";
import { ArrowRightIcon, AtSignIcon } from "./icons";
import { TextGenerateEffect } from "./custom/text-generate-effect";
import { SquigglyUnderline } from "./custom/squiggly-underline";
import { SpotifyNowPlaying } from "./custom/spotify-now-playing";

const jobTitles = [
  "Full Stack Developer",
  "Software Engineer",
  "AI Engineer",
  "Football Lover",
];

export function Profile({ spotifyData }) {
  const router = useTransitionRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % jobTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const greetingWords = ["Hey", "I'm", "Falak"];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl gap-8 px-4 mx-auto mt-8 mb-16 md:mt-16 md:mb-24">
      <div className="flex flex-col items-center w-full gap-8 md:flex-row md:items-start md:gap-12">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-full ring-2 ring-clay-500/20 ring-offset-4 ring-offset-background overflow-hidden md:mt-1 transform transition-all duration-1000 ease-out shadow-lg ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            priority
            alt="Falak Gala"
            className="object-cover"
            src="/profile.png"
            fill
            sizes="(max-width: 768px) 128px, 144px"
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col items-center flex-1 text-center md:items-start md:text-left space-y-5">
          {/* Header */}
          <div className="flex flex-col items-center md:items-start space-y-1 w-full relative">
            <motion.h1
              className="text-xl font-balance tracking-tight text-foreground flex flex-wrap justify-center md:justify-start"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {greetingWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-lg font-medium text-clay-500 mt-2 h-8 flex items-center justify-center md:justify-start"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="inline-block"
                >
                  {jobTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Intro Text */}
          <div className="space-y-4 w-full">
            <TextGenerateEffect
              words="Whipping up clever solutions and wrestling with tricky challenges because who doesn't love a good tech puzzle?"
              className="text-base md:text-lg leading-relaxed text-foreground/80 md:text-left"
              delay={1}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-base leading-relaxed text-foreground/70"
            >
              This is my quirky web nook for spilling my{" "}
              <SquigglyUnderline
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/blog", {
                    onTransitionReady: slideInOut,
                  });
                }}
                className="font-medium text-clay-500 transition-colors hover:text-clay-400"
                href="/blog"
              >
                learnings
              </SquigglyUnderline>{" "}
              and{" "}
              <SquigglyUnderline
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/projects", {
                    onTransitionReady: slideInOut,
                  });
                }}
                className="font-medium text-clay-500 transition-colors hover:text-clay-400"
                href="/projects"
              >
                projects
              </SquigglyUnderline>
              .
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="text-sm md:text-base text-foreground/60 flex flex-wrap items-center justify-center md:justify-start gap-1"
            >
              <span>Outside work, I love watching football</span>
              <span>and listening to</span>
              <SpotifyNowPlaying songData={spotifyData} />
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            className="flex flex-col items-center gap-3 mt-4 md:items-start w-full pt-2"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start sm:gap-3">
              <Button
                variant="outline"
                className="hover:bg-transparent hover:border-clay-400"
                asChild
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/hire-me", {
                      onTransitionReady: slideInOut,
                    });
                  }}
                  href="/hire-me"
                >
                  <span className="w-4 h-4 bg-gradient-to-br from-clay-300 via-clay-500 to-clay-700 rounded-full sm:w-5 sm:h-5 me-2 shadow-[0_0_8px_rgba(161,93,58,0.5)]" />
                  Available for Hire
                </a>
              </Button>
              <div className="relative group">
                <Button
                  variant="outline"
                  className="hover:bg-transparent hover:border-clay-400"
                  asChild
                >
                  <Link href="mailto:falakgala09@gmail.com">
                    <AtSignIcon
                      className="-ms-1 text-clay-500"
                      size={16}
                      aria-hidden="true"
                    />
                    Let's Talk
                    <ArrowRightIcon
                      className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <div className="absolute hidden px-2 py-1 mt-2 text-xs text-clay-500 transform -translate-x-1/2 bg-background rounded-lg shadow-lg sm:text-sm left-1/2 top-full group-hover:block z-10">
                  falakgala09@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
