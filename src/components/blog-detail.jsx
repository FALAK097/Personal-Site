"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogDetail({ post, html, prevPost, nextPost }) {
  return (
    <div className="flex-1 w-full max-w-3xl px-4 py-12 mx-auto">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-2 text-2xl md:text-4xl font-bold text-foreground">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8 text-sm text-muted-foreground border-b pb-4">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
        <div
          className="prose dark:prose-invert prose-sm md:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </motion.article>

      <nav className="mt-16 pt-8 border-t flex justify-between items-center">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            {nextPost.title} →
          </Link>
        )}
      </nav>
    </div>
  );
}
