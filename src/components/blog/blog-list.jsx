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
                <article key={post.slug} className="group relative">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/blog/${post.slug}`, {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    href={`/blog/${post.slug}`}
                    className="block p-5 -mx-5 rounded-2xl transition-all duration-300 hover:bg-muted/50 border border-transparent hover:border-border hover:shadow-sm"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-medium text-foreground group-hover:text-clay-500 transition-colors duration-300">
                          {post.title}
                        </h2>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex gap-3 text-sm text-muted-foreground/80 font-medium">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "MMM dd, yyyy")}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
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
