import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/project-data";

export const metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects, including web applications, saas products and personal experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">Projects</h1>
            <p className="text-md text-muted-foreground">
              Here are some of the projects I&apos;ve worked on. Each one has
              taught me something new and helped me grow as a developer.
            </p>
          </div>
          <ProjectList projects={projects} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
