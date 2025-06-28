"use client";

import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

const ellipseVariants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.7, 1],
    scale: [1, 1.1, 1],
    transition: { duration: 0.7 },
  },
};

const pathVariants = {
  normal: { opacity: 1, pathLength: 1 },
  animate: {
    opacity: [1, 0.7, 1],
    pathLength: [1, 0.8, 1],
    transition: { duration: 0.7 },
  },
};

const DatabaseIcon = forwardRef(
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
          <motion.ellipse
            cx="12"
            cy="5"
            rx="9"
            ry="3"
            variants={ellipseVariants}
            initial="normal"
            animate={controls}
          />
          <motion.path
            d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"
            variants={pathVariants}
            initial="normal"
            animate={controls}
          />
          <motion.path
            d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"
            variants={pathVariants}
            initial="normal"
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

DatabaseIcon.displayName = "DatabaseIcon";

export { DatabaseIcon };
