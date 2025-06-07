import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookmarksList } from "@/components/bookmarks-list";

export const metadata = {
  title: "Bookmarks",
  description:
    "A curated collection of my favorite tools, articles, and engineering resources that inspire and support my work as a developer.",
};

export default function BookmarksPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">Bookmarks</h1>
            <p className="text-md text-muted-foreground">
              A curated collection of my favorite tools, articles, and
              engineering resources that inspire and support my work as a
              developer.
            </p>
          </div>
          <BookmarksList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
