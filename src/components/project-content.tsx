import Image from "next/image";
import {Github, Globe} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {Mdx} from "@/components/mdx";
import {Project} from "@/lib/placeholder-project";

export function ProjectContent({project}: {project: Project}) {
  return (
    <article className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="aspect-video relative mb-6 overflow-hidden rounded-md">
            <Image
              fill
              alt={project.title}
              className="object-cover"
              src={project.imageUrl || "/placeholder.svg"}
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          <div className="flex space-x-4 mb-8">
            <Button asChild variant="outline">
              <a href={project.githubUrl} rel="noopener noreferrer" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={project.deployedUrl} rel="noopener noreferrer" target="_blank">
                <Globe className="mr-2 h-5 w-5" />
                Live Demo
              </a>
            </Button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <Mdx code={project.content} />
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
