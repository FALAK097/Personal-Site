"use client";

import { motion } from "framer-motion";

export const SquigglyUnderline = ({ children, className, onClick, href }) => {
  return (
    <span className="relative inline-block group">
      <a onClick={onClick} className={`relative z-10 ${className}`} href={href}>
        {children}
      </a>
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-2 overflow-visible"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4, ease: "easeInOut" }}
      >
        <motion.path
          d="M0,4 Q25,1 50,4 T100,4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-purple-400"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.4, ease: "easeInOut" }}
        />
      </motion.svg>
    </span>
  );
};
