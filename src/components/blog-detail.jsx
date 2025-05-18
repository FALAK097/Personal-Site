"use client";

import { motion } from "framer-motion";

export default function BlogDetail({ post, html }) {
  return (
    <div className="max-w-2xl px-4 py-12 mx-auto">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-white shadow-lg rounded-xl"
      >
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <div className="flex gap-2 mb-6 text-sm text-muted-foreground">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{Math.ceil(post.readingTime)} min</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </motion.article>
    </div>
  );
}
