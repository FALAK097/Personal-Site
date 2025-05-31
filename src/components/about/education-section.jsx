import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const educationData = [
  {
    degree: "BE in Computer Engineering",
    institution: "KC College of Engineering",
    duration: "2022 - 2024",
    grade: "8.8/10",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "K.J Somaiya Polytechnic",
    duration: "2018 - 2021",
    grade: "93%/100",
  },
];

export const EducationSection = forwardRef((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="education"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-lg font-medium">Education</h2>

      <div className="space-y-6">
        {educationData.map((education, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1">
                <h3 className="text-md font-medium">{education.degree}</h3>
                <p className="text-muted-foreground text-sm">
                  {education.institution}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between sm:flex-col sm:gap-1">
                <Badge
                  variant="outline"
                  className="w-fit px-3 py-1 bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800 dark:text-purple-400"
                >
                  {education.duration}
                </Badge>
                <span className="text-sm font-light">{education.grade}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});
