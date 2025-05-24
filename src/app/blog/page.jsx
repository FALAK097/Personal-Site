import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      {/* <main className="container flex-1 px-4 py-8 mx-auto">
        <BlogList posts={posts} />
      </main> */}
      {/* coming soon */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Blog Coming Soon!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Stay tuned for updates on my blog. I can't wait to share my thoughts
            and experiences with you!
          </p>
          <p className="text-sm text-muted-foreground">
            In the meantime, feel free to check out my projects or contact me
            for any inquiries.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
