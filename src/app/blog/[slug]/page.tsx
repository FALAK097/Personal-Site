import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { posts } from "@/lib/placeholder-data"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((post) => post.url === `/blog/${params.slug}`)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto prose dark:prose-invert">
          <div className="mb-8 not-prose">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{format(new Date(post.date), "MMMM dd, yyyy")}</time>
              <span>•</span>
              <span>{Math.ceil(post.readingTime.minutes)} min read</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
          </div>

          <p className="lead">{post.description}</p>

          <p>
            This is a placeholder for the full blog post content. Once Contentlayer is properly set up, this will be
            replaced with the actual MDX content.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  )
}

