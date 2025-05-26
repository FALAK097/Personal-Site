"use client";

import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/animation";

export function BlogList({ posts }) {
  const router = useTransitionRouter();

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
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/blog/${post.slug}`, {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    href={`/blog/${post.slug}`}
                    className="space-y-3 hover:no-underline"
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-medium transition-colors hover:text-purple-500">
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
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </a>
                </article>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
