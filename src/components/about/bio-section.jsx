import { forwardRef } from "react";
import { motion } from "framer-motion";

export const BioSection = forwardRef((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="bio"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="space-y-4 text-muted-foreground">
        <p>
          My journey into the world of coding began during my high school years
          when I first discovered the magic of creating something from nothing
          but lines of code. What started as curiosity quickly evolved into
          passion as I spent countless nights exploring different programming
          languages and building small projects.
        </p>
        <p>
          I remember the excitement of completing my first functional website—a
          simple blog that barely worked but felt like a monumental achievement.
          That early success fueled my determination to dive deeper into the
          vast ocean of software development.
        </p>
        <p>
          Throughout my academic years, I balanced formal education with
          self-directed learning, always staying ahead of the curve by
          experimenting with emerging technologies. The open-source community
          became my virtual classroom, where I learned not just how to code, but
          how to collaborate, receive feedback, and contribute to something
          larger than myself.
        </p>
        <p>
          Today, I approach each project with the same enthusiasm I had when
          writing my first "Hello World" program, combined with years of
          experience and technical expertise. I believe that great software is
          born at the intersection of technical excellence and human-centered
          design—a philosophy that guides my work every day.
        </p>
      </div>
    </motion.section>
  );
});
