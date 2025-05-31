"use client";

import { useRef, useState, useEffect } from "react";
import { BioSection } from "./bio-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { TableOfContents } from "./table-of-contents";

const sections = [
  { id: "bio", label: "Bio" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

export const AboutContent = () => {
  const [activeSection, setActiveSection] = useState("bio");
  const containerRef = useRef(null);
  const sectionRefs = {
    bio: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    education: useRef(null),
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return { id, observer };
    });

    return () => {
      observers.forEach(({ id, observer }) => {
        if (sectionRefs[id].current) {
          observer.unobserve(sectionRefs[id].current);
        }
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const section = sectionRefs[id].current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-8 relative" ref={containerRef}>
      <div className="flex-1 space-y-16">
        <BioSection ref={sectionRefs.bio} />
        <SkillsSection ref={sectionRefs.skills} />
        <ExperienceSection ref={sectionRefs.experience} />
        <EducationSection ref={sectionRefs.education} />
      </div>

      <div className="hidden lg:block w-48">
        <div className="sticky top-24 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            On this page
          </h3>
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
        </div>
      </div>
    </div>
  );
};
