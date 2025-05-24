import { serialize } from "next-mdx-remote-client/serialize";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import BlogDetail from "@/components/blog-detail";
import { MdxContent } from "@/components/mdx-content";

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
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] || null;
  const prevPost = posts[currentIndex - 1] || null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      {/* <BlogDetail post={post} prevPost={prevPost} nextPost={nextPost}>
        <MdxContent source={mdxSource} />
      </BlogDetail> */}
      {/* not found */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The blog post you are looking for does not exist or has been
            removed.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check the URL or return to the homepage.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
