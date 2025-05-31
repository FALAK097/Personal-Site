import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  AtSignIcon,
  RssIcon,
} from "@/components/icons";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        className="transition-colors text-foreground/60 hover:text-foreground"
        href="mailto:falakgala09@gmail.com"
        aria-label="Email"
      >
        <AtSignIcon />
      </a>
      <a
        className="transition-colors text-foreground/60 hover:text-foreground"
        href="https://x.com/FalakGala097"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <TwitterIcon />
      </a>
      <a
        className="transition-colors text-foreground/60 hover:text-foreground"
        href="https://github.com/Falak097"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
      <a
        className="transition-colors text-foreground/60 hover:text-foreground"
        href="https://linkedin.com/in/falak-gala"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedinIcon />
      </a>
      <a
        className="transition-colors text-foreground/60 hover:text-foreground"
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RSS Feed"
      >
        <RssIcon />
      </a>
    </div>
  );
}
