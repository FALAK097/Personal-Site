import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">Blog</h1>
            <p className="text-md text-muted-foreground">
              Welcome to my blog where I share my thoughts and learnings.
            </p>
          </div>
          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
