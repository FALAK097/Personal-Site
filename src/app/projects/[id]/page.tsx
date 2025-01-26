import {notFound} from "next/navigation";

import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {ProjectContent} from "@/components/project-content";
import {projects} from "@/lib/placeholder-project";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({params}: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProjectContent project={project} />
      </main>
      <Footer />
    </div>
  );
}
