import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { TrendingUpIcon } from "@/components/icons/trending-up";

export default function HireMePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold">Hire Me</h1>
            <p className="text-lg text-muted-foreground">
              I&apos;m always interested in hearing about new opportunities.
              Feel free to reach out if you&apos;d like to work together or
              simply discuss ideas.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-transparent hover:border-purple-400"
            >
              <a href="/resume.pdf" rel="noopener noreferrer" target="_blank">
                View Resume
                <TrendingUpIcon className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <ContactForm />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">Mumbai, India</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <p className="text-muted-foreground">
                  Open to full-time opportunities and interesting projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
