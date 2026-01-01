"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/animation";
import { SkillsLogo } from "./custom/skills-logo";

export function RecentProjects({ projects }) {
  const router = useTransitionRouter();

  const getLink = (project) =>
    project.deployedUrl || project.githubUrl || "/projects";

  // Bento layout configuration - balanced grid
  const bentoConfig = [
    { colSpan: "md:col-span-7", rowSpan: "", size: "large" },
    { colSpan: "md:col-span-5", rowSpan: "", size: "medium" },
    { colSpan: "md:col-span-5", rowSpan: "", size: "medium" },
    { colSpan: "md:col-span-7", rowSpan: "", size: "medium" },
    { colSpan: "md:col-span-6", rowSpan: "", size: "medium" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-light"
        >
          I love building products
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            router.push("/projects", {
              onTransitionReady: slideInOut,
            });
          }}
          href="/projects"
          className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
        >
          View All
        </motion.a>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        {projects.slice(0, 4).map((project, index) => {
          const href = getLink(project);
          const config = bentoConfig[index] || bentoConfig[3];

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-border hover:shadow-xl transition-all duration-500 ${config.colSpan}`}
            >
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="absolute inset-0 z-10"
                aria-label={`Open ${project.title}`}
              />

              <div className="relative h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden h-32 md:h-40">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base md:text-lg">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs md:text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Icons */}
                  <div className="flex flex-wrap gap-2 mt-3 relative z-20">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <div
                        key={tag}
                        className="pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SkillsLogo skill={tag} index={tagIndex} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
