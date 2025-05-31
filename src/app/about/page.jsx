import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutContent } from "@/components/about/about-content";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-xl font-semibold">About Me</h1>
          <AboutContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
