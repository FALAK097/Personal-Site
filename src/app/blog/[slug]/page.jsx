import { serialize } from "next-mdx-remote/serialize";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import BlogDetail from "@/components/blog-detail";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "tokyo-night",
            keepBackground: false,
            defaultLang: "plaintext",
          },
        ],
      ],
    },
  });

  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const nextPost = posts[currentIndex + 1] || null;
  const prevPost = posts[currentIndex - 1] || null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <BlogDetail
        post={post}
        source={mdxSource}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      <Footer />
    </div>
  );
}
