"use client";

import { format } from "date-fns";
import { useTransitionRouter } from "next-view-transitions";
import { motion, AnimatePresence } from "framer-motion";
import { slideInOut } from "@/lib/animation";

export function RecentPosts({ posts }) {
  const router = useTransitionRouter();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-light"
        >
          I love writing things down
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            router.push("/blog", {
              onTransitionReady: slideInOut,
            });
          }}
          href="/blog"
          className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
        >
          View All
        </motion.a>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/blog/${post.slug}`, {
                      onTransitionReady: slideInOut,
                    });
                  }}
                  className="space-y-3 hover:no-underline"
                  href={`/blog/${post.slug}`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium transition-colors hover:text-purple-500">
                      {post.title}
                    </h3>
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
              </motion.article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
