import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NewsletterPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Keep in Touch</h1>
            <p className="text-lg text-muted-foreground">
              If you&apos;d like to receive blog post updates straight to your inbox, feel free to subscribe to my
              newsletter 📬
            </p>
          </div>
          <div className="max-w-xl">
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="me@example.com"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

