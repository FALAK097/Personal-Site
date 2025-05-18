import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/getBlogs";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="container flex-1 px-4 py-8 mx-auto">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
