"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TextGenerateEffect = ({ words, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const renderWords = () => {
    return (
      <motion.div className={className}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={isVisible ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.3,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return renderWords();
};
