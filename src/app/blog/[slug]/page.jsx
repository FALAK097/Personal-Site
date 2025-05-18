import { getPostBySlug, getAllPosts } from "@/lib/getBlogs";
import { notFound } from "next/navigation";
import { marked } from "marked";
import BlogDetail from "@/components/blog-detail";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const html = marked.parse(post.content);

  return <BlogDetail post={post} html={html} />;
}
