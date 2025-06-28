"use client";

import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

const polylineVariants = {
  normal: { opacity: 1, pathLength: 1 },
  animate: {
    opacity: [0.7, 1, 0.7, 1],
    pathLength: [0.8, 1, 0.8, 1],
    transition: { duration: 0.7 },
  },
};

const CodeIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 20, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.polyline
            points="16 18 22 12 16 6"
            variants={polylineVariants}
            initial="normal"
            animate={controls}
          />
          <motion.polyline
            points="8 6 2 12 8 18"
            variants={polylineVariants}
            initial="normal"
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

CodeIcon.displayName = "CodeIcon";

export { CodeIcon };
