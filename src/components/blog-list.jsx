"use client";

import { format } from "date-fns";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function BlogList({ posts }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-8">
            {posts.map((post) => {
              return (
                <article key={post.slug} className="group">
                  <Link
                    className="space-y-3 hover:no-underline"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold transition-colors group-hover:text-purple-400">
                        {post.title}
                      </h2>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "MMM dd, yyyy")}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime} min</span>
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
