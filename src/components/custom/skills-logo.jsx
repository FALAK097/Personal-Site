"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const skillLogos = {
  JavaScript: { logo: "/skills/javascript.svg", name: "JavaScript" },
  TypeScript: { logo: "/skills/typescript.svg", name: "TypeScript" },
  Python: { logo: "/skills/python.svg", name: "Python" },
  "React.js": { logo: "/skills/react.svg", name: "React.js" },
  "Node.js": { logo: "/skills/nodejs.svg", name: "Node.js" },
  "Next.js": {
    logo: {
      light: "/skills/nextjs.svg",
      dark: "/skills/nextjs-light.svg",
    },
    name: "Next.js",
  },
  Tailwind: { logo: "/skills/tailwindcss.svg", name: "Tailwind" },
  Authjs: { logo: "/skills/authjs.svg", name: "Authjs" },
  Prisma: { logo: "/skills/prisma.svg", name: "Prisma" },
  Drizzle: { logo: "/skills/drizzle.svg", name: "Drizzle" },
  OpenAI: {
    logo: {
      light: "/skills/openai.svg",
      dark: "/skills/openai-light.svg",
    },
    name: "OpenAI",
  },
  FastAPI: { logo: "/skills/fastapi.svg", name: "FastAPI" },
  PostgreSQL: { logo: "/skills/postgresql.svg", name: "PostgreSQL" },
  Neon: { logo: "/skills/neon.svg", name: "Neon" },
  Docker: { logo: "/skills/docker.svg", name: "Docker" },
  DigitalOcean: { logo: "/skills/digitalocean.svg", name: "DigitalOcean" },
};

export const SkillsLogo = ({ skill, index }) => {
  const { theme } = useTheme();
  const skillData = skillLogos[skill];

  if (!skillData) return null;

  const logoSrc =
    typeof skillData.logo === "string"
      ? skillData.logo
      : theme === "dark"
      ? skillData.logo.dark
      : skillData.logo.light;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.2,
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-lg shadow-md flex items-center justify-center border transition-all duration-200 hover:shadow-lg">
              <Image
                src={logoSrc || "/prisma.svg"}
                alt={skillData.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <span>{skillData.name}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
