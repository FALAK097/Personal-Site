import type {Post} from "@/lib/placeholder-data";

import Link from "next/link";
import {format} from "date-fns";
import {Camera, Book, Code, Music, Pencil} from "lucide-react";

const categoryIcons = {
  Photography: Camera,
  Reading: Book,
  Coding: Code,
  Music: Music,
  Writing: Pencil,
  Thinking: Pencil,
};

export function BlogList({posts}: {posts: Post[]}) {
  return (
    <div className="space-y-8">
      {posts.map((post) => {
        const Icon = categoryIcons[post.category as keyof typeof categoryIcons] || Pencil;

        return (
          <article key={post.url} className="group">
            <Link className="space-y-3 hover:no-underline" href={post.url}>
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </div>

              <div className="flex gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{format(new Date(post.date), "MMM dd, yyyy")}</time>
                <span>•</span>
                <span>{Math.ceil(post.readingTime.minutes)} min</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>

              <p className="text-muted-foreground line-clamp-2">{post.description}</p>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
