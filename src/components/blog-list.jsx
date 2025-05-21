"use client";

import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function BlogList({ posts }) {
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];
  const [selected, setSelected] = useState("All");
  const filtered =
    selected === "All" ? posts : posts.filter((p) => p.category === selected);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 rounded-full border transition-colors duration-200 ${
              selected === cat
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-500 border-purple-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-8">
            {filtered.map((post) => {
              return (
                <article key={post.slug} className="group">
                  <Link
                    className="space-y-3 hover:no-underline"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold transition-colors group-hover:text-purple-400">
                        {post.title}
                      </h2>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "MMM dd, yyyy")}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime} min</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  </Link>
                </article>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
