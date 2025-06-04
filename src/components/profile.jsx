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

const jobTitles = [
  "Full Stack Developer",
  "Software Engineer",
  "AI Engineer",
  "Football Lover",
];

export function Profile() {
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
    <div className="flex flex-col items-center max-w-5xl gap-6 px-4 mx-auto mb-12">
      <div className="flex flex-col items-center w-full gap-6 md:flex-row">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative w-24 h-24 mt-4 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-2 border-purple-500 overflow-hidden transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            fill
            priority
            alt="Profile picture"
            className="object-cover"
            src="/profile.png"
          />
        </motion.div>

        <div className="flex-1 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <motion.h1
              className="text-2xl tracking-tight font-font-medium flex flex-wrap justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {greetingWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-2"
                  style={{ display: "inline-block", minWidth: "fit-content" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-purple-500 min-h-[2rem] flex items-center justify-center"
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

          <TextGenerateEffect
            words="Whipping up clever solutions and wrestling with tricky challenges—because who doesn't love a good tech puzzle?"
            className="text-base leading-relaxed break-words sm:text-lg md:text-xl text-foreground/90"
            delay={1.2}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="text-sm leading-relaxed break-words sm:text-base md:text-lg text-foreground/70"
          >
            This is my quirky web nook for spilling my{" "}
            <SquigglyUnderline
              onClick={(e) => {
                e.preventDefault();
                router.push("/blog", {
                  onTransitionReady: slideInOut,
                });
              }}
              className="text-purple-500 transition-colors hover:text-purple-400"
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
              className="text-purple-500 transition-colors hover:text-purple-400"
              href="/projects"
            >
              projects
            </SquigglyUnderline>
            !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            className="flex flex-col items-center gap-3 mt-4"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
              <Button
                variant="outline"
                className="hover:bg-transparent hover:border-purple-400"
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
                  <span className="w-4 h-4 bg-purple-500 rounded-full sm:w-5 sm:h-5 opacity-60 me-2" />
                  Available for Hire
                </a>
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">OR</span>
                <div className="relative group">
                  <Button
                    variant="outline"
                    className="hover:bg-transparent hover:border-purple-400"
                    asChild
                  >
                    <Link href="mailto:falakgala09@gmail.com">
                      <AtSignIcon
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
                  <div className="absolute hidden px-2 py-1 mt-2 text-xs text-purple-500 transform -translate-x-1/2 bg-background rounded-lg shadow-lg sm:text-sm left-1/2 top-full group-hover:block">
                    falakgala09@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
