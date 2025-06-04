import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MdxCodeBlock } from "@/components/blog/mdx-code-block";
import BlogDetail from "@/components/blog/blog-detail";

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
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "catppuccin-mocha",
          },
        ],
      ],
    },
  };

  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] || null;
  const prevPost = posts[currentIndex - 1] || null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BlogDetail post={post} prevPost={prevPost} nextPost={nextPost}>
        <MDXRemote
          source={post.content}
          options={options}
          components={{
            pre: MdxCodeBlock,
          }}
        />
      </BlogDetail>
      <Footer />
    </div>
  );
}
