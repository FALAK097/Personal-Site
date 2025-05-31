import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SkillsLogo } from "@/components/skills-logo";
import { ChevronRightIcon } from "@/components/icons";

const experiences = [
  {
    title: "Software Engineer",
    company: "SSingularitee Technologies Pvt Ltd",
    duration: "July 2024 - Present",
    technologies: ["Python", "Flask", "FastAPI", "Machine Learning"],
    achievements: [
      "Developed AI models for various applications",
      "Implemented RESTful APIs using FastAPI",
      "Built scalable machine learning solutions",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "SSingularity Technologies",
    duration: "January 2023 - July 2023",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Laravel",
      "MySQL",
      "Bootstrap",
      "Python",
      "Flask",
    ],
    achievements: [
      "Improved website performance through component optimization",
      "Implemented responsive layouts using Bootstrap",
      "Developed and maintained backend using Laravel and MySQL",
      "Deployed machine learning models using Python and Flask",
    ],
  },
];

export const ExperienceSection = forwardRef((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-lg font-medium">Experience</h2>

      <div className="space-y-12">
        {experiences.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div className="flex-1">
                <h3 className="text-md font-medium">{job.title}</h3>
                <p className="text-muted-foreground text-md">{job.company}</p>
              </div>
              <Badge
                variant="secondary"
                className="self-start w-fit px-3 py-1 bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800 dark:text-purple-400"
              >
                {job.duration}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-3">
                  {job.technologies.map((tech, techIndex) => (
                    <SkillsLogo key={tech} skill={tech} index={techIndex} />
                  ))}
                </div>
              </div>

              <div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRightIcon />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});
