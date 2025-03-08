import {Github, Globe} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";

export function ProjectList({projects}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardContent className="flex-grow p-6">
            <div className="aspect-video relative mb-4 overflow-hidden rounded-md">
              <Image
                fill
                alt={project.title}
                className="object-cover"
                src={project.imageUrl || "/placeholder.svg"}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-6 pt-0">
            <div className="flex space-x-2">
              <Button asChild size="sm" variant="outline">
                <a href={project.githubUrl} rel="noopener noreferrer" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={project.deployedUrl} rel="noopener noreferrer" target="_blank">
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </div>
            <Button asChild size="sm" variant="default">
              <Link href={`/projects/${project.id}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
