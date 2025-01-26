import {WavesIcon as Wave} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Profile() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16 max-w-4xl mx-auto">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-border overflow-hidden">
        <Image
          fill
          priority
          alt="Profile picture"
          className="object-cover"
          src="/placeholder.svg"
        />
      </div>

      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-xl md:text-2xl font-semibold">Hey,</h1>
          <Wave className="w-6 h-6" />
          <h1 className="text-xl md:text-2xl font-semibold">I am Falak Gala,</h1>
        </div>

        <p className="text-lg md:text-xl">
          I am a Software Engineer working at a startup. I love building products, currently working
          on exciting projects.
        </p>

        <p className="text-base md:text-lg text-foreground/80">
          Welcome to my spot on the web for writing, projects, tutorials, art, and anything else I
          want to put out there. On the site, you&apos;ll find my{" "}
          <a className="text-blue-400 hover:underline" href="/notes">
            notes
          </a>{" "}
          and all the{" "}
          <a className="text-blue-400 hover:underline" href="/articles">
            technical articles
          </a>{" "}
          I&apos;ve written over the years. Check out the{" "}
          <Link className="text-blue-400 hover:underline" href="/projects">
            projects
          </Link>{" "}
          page to see a highlight of my open-source work.
        </p>
      </div>
    </div>
  );
}
