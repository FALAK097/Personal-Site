import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillsLogo } from "../skills-logo";

const skillCategories = {
  Frontend: ["JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind"],
  Backend: ["Node.js", "Python", "FastAPI", "Prisma", "Drizzle"],
  Database: ["PostgreSQL", "Neon"],
  DevOps: ["Docker", "DigitalOcean"],
  Tools: ["Authjs", "OpenAI"],
};

export const SkillsSection = forwardRef((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-lg font-medium">Skills</h2>

      <Tabs defaultValue="Frontend" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto p-1 bg-muted/50">
          {Object.keys(skillCategories).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-sm py-2.5 px-2 sm:py-2 sm:px-1 data-[state=active]:bg-purple-500/20 data-[state=active]:text-black data-[state=active]:border-purple-500 data-[state=active]:shadow-sm dark:data-[state=active]:bg-purple-500/20 dark:data-[state=active]:text-white dark:data-[state=active]:border-purple-500 dark:data-[state=active]:shadow-sm transition-all duration-200"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(skillCategories).map(([category, skills]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
            >
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex flex-col items-center space-y-2"
                >
                  <SkillsLogo skill={skill} index={index} />
                  <span className="text-xs text-center text-muted-foreground">
                    {skill}
                  </span>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.section>
  );
});
