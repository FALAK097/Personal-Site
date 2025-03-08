import {notFound} from "next/navigation";

import {Footer} from "@/components/footer";
import {Navbar} from "@/components/navbar";
import {ProjectContent} from "@/components/project-content";
import {projects} from "@/lib/placeholder-project";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({params: {id}}) {
  const project = projects.find((p) => p.id === id);

  if (!project) return notFound();

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({params: {id}}) {
  const project = projects.find((p) => p.id === id);

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
