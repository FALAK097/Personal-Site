import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogList } from "@/components/blog-list"
import { posts } from "@/lib/placeholder-data"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              This is where I write. Subscribe to my{" "}
              <a href="/newsletter" className="text-blue-400 hover:underline">
                newsletter
              </a>{" "}
              to get future posts straight to your inbox.
            </p>
          </div>
          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

