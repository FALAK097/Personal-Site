"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GithubIcon } from "./icons/github";
import { LinkIcon } from "./icons/link";

export function ProjectList({ projects }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card
            className="flex flex-col overflow-hidden  shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-muted-foreground/20"
            role="article"
            aria-labelledby={`project-title-${project.id}`}
          >
            <CardContent className="grow p-5">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  fill
                  alt={project.title}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  src={project.imageUrl || "/placeholder.svg"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <h2
                id={`project-title-${project.id}`}
                className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2"
              >
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs sm:text-sm bg-linear-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 text-purple-800 dark:text-purple-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-5 pt-0 gap-3">
              <Button
                asChild
                variant="outline"
                className="hover:bg-transparent hover:border-purple-500"
              >
                <a
                  href={project.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="hover:bg-transparent hover:border-purple-500"
              >
                <a
                  href={project.deployedUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <LinkIcon className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
