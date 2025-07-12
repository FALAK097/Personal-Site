---
url: <https://falakgala.dev/blog/how-i-built-nextjs-blog>
title: "How I Built a Modern Portfolio Blog with Next.js 15 and MDX | Falak Gala's Blog | Falak Gala's Portfolio"
---

[Back to Blog](https://falakgala.dev/blog)

# How I Built a Modern Portfolio Blog with Next.js 15 and MDX

May 24, 2025•6 min read

When building my portfolio, I wanted a blog that wasn't just functional but also showcased my technical abilities. Here's how I created a modern, fast, and feature-rich blog system that seamlessly integrates with my portfolio.

### Tech Stack Overview

Here are the key dependencies I'm using (versions from my actual implementation):

```
{
  "dependencies": {
    "next": "15.3.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "gray-matter": "^4.0.3",
    "next-mdx-remote-client": "^2.1.2",
    "reading-time": "^1.5.0",
    "rehype-pretty-code": "^0.14.1",
    "framer-motion": "^12.9.4",
    "next-themes": "^0.4.4",
    "@tailwindcss/typography": "^0.5.16",
    "lucide-react": "^0.474.0"
  }
}
```

### Why These Choices?

- **Next.js 15**: Latest version with improved performance and enhanced App Router
- **MDX**: Write blog posts with JSX components inline
- **Framer Motion**: Smooth animations for better UX
- **next-themes**: Seamless dark mode integration
- **TailwindCSS Typography**: Beautiful prose styling

### Project Structure

```
src/
  ├── app/
  │   └── blog/
  │       └── [slug]/
  │           └── page.jsx
  ├── components/
  │   └── blog-detail.jsx
  ├── content/
  │   └── blog/
  │       └── *.mdx
  └── lib/
      └── mdx.js
```

### Setting Up MDX Processing

The **mdx.js** file handles reading and processing MDX files:

```
// Key features:
// 1. Reads MDX files from the content directory
// 2. Parses frontmatter using gray-matter
// 3. Calculates reading time
// 4. Sorts posts by date

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);

  const posts = files
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, fileName), "utf8");
      const { data: frontMatter, content } = matter(source);
      const slug = fileName.replace(/\.mdx?$/, "");

      return {
        ...frontMatter,
        slug,
        readingTime: Math.ceil(readingTime(content).minutes),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug) {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), "utf8");
  const { data: frontMatter, content } = matter(source);

  return {
    ...frontMatter,
    slug,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
  };
}

```

### Dynamic Routing

In **blog/\[slug\]/page.jsx**, we set up dynamic routing for blog posts:

```
// Key features:
// 1. Static path generation for all posts
// 2. MDX rendering with syntax highlighting
// 3. Previous/Next post navigation

import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import { MdxCodeBlock } from "@/components/mdx-code-block";
import BlogDetail from "@/components/blog-detail";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params: rawParams }) {
  const params = await Promise.resolve(rawParams);
  const slug = params.slug;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const options = {
    mdxOptions: {
      rehypePlugins: [\
        [\
          rehypePrettyCode,\
          {\
            theme: "catppuccin-mocha",\
          },\
        ],\
      ],
    },
  };

  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] || null;
  const prevPost = posts[currentIndex - 1] || null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BlogDetail post={post} prevPost={prevPost} nextPost={nextPost}>
        <MDXRemote
          source={post.content}
          options={options}
          components={{
            pre: MdxCodeBlock,
          }}
        />
      </BlogDetail>
    </div>
  );
}
```

### Blog Detail Component

The **components/blog-detail.jsx** component handles the presentation:

```
// Key features:
// 1. Smooth animations with Framer Motion
// 2. Share functionality with Web Share API
// 3. Responsive design
// 4. Dark mode support

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon } from "lucide-react";
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
        <h1 className="mb-2 text-lg font-bold text-foreground">{post.title}</h1>
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
```

### Writing Blog Posts

Create **.mdx** files in **src/content/blog/** with frontmatter:

```
---
title: "Your Blog Post Title"
date: "2024-01-20"
description: "A brief description of your post"
---

Your content here with **Markdown** support!
```

### Features Implemented

1. **MDX Support**: Write posts in Markdown with JSX components
2. **Syntax Highlighting**: Using `rehype-pretty-code`
3. **Reading Time**: Automatic calculation for each post
4. **Share Functionality**: Native Web Share API with clipboard fallback
5. **Animations**: Smooth transitions using Framer Motion
6. **Previous/Next Navigation**: Easy post navigation
7. **Responsive Design**: Mobile-friendly layout

### Styling and Theming

- Refer to [Tailwind Typography Github](https://github.com/tailwindlabs/tailwindcss-typography)
- I used TailwindCSS with the Typography plugin for beautiful prose styling. Here's how I set it up:

```
// global.css

@plugin "@tailwindcss/typography";
```

```
// Example of how I handle dark mode and typography (blog-detail.jsx)
<div className="flex-1 w-full max-w-4xl px-4 py-12 mx-auto prose dark:prose-invert">
  // Blog content here
</div>
```

### Conclusion

This blog system provides a solid foundation for technical writing with modern features like syntax highlighting, dark mode, and responsive design. Feel free to use this as inspiration for your own blog!

[View Source](https://github.com/Falak097/Personal-Site)

PS: This very blog post is written using the same system! Feel free to reach out if you have any questions or need help setting up your own blog with Next.js and MDX.

Enjoyed this article? Share it with your network!
