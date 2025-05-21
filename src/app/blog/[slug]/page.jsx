import { getPostBySlug, getAllPosts } from "@/lib/getBlogs";
import { notFound } from "next/navigation";
import { marked } from "marked";
import BlogDetail from "@/components/blog-detail";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const html = marked.parse(post.content);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <BlogDetail
        post={post}
        html={html}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      <Footer />
    </div>
  );
}
