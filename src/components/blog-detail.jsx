"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon } from "@/components/icons";
import { Button } from "./ui/button";

export default function BlogDetail({ post, children, prevPost, nextPost }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl px-4 py-12 mx-auto prose dark:prose-invert">
      <div className="mb-8">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors"
        >
          <ArrowLeftIcon /> Back to Blog
        </Link>
      </div>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-2 text-2xl md:text-4xl font-bold text-foreground">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8 text-sm text-muted-foreground border-b pb-4">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
        {children}
      </motion.article>

      <div className="mt-8 flex items-center justify-end gap-4 pt-4 border-t">
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">
            Enjoyed this article? Share it with your network!
          </p>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="cursor-pointer bg-transparent border-none text-purple-400 hover:bg-transparent hover:text-purple-400"
          >
            <UploadIcon />
          </Button>
        </div>
      </div>
      <nav className="mt-8 pt-8 flex justify-between items-center">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors no-underline"
          >
            <ArrowLeftIcon />
            {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors ml-auto no-underline"
          >
            {nextPost.title}
            <ArrowRightIcon />
          </Link>
        )}
      </nav>
    </div>
  );
}
