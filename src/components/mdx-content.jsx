import { MDXRemote } from "next-mdx-remote";
import * as React from "react";
import { CopyIcon, CheckIcon, ExternalLink } from "lucide-react";

import { Callout } from "@/components/callout";
import { MdxCard } from "@/components/mdx-card";
import { cn } from "@/lib/utils";

function Pre({ children, ...props }) {
  const ref = React.useRef(null);
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    if (ref.current) {
      const code = ref.current.textContent;
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative" {...props}>
      <pre ref={ref}>
        <div className="relative">
          <button
            onClick={onCopy}
            className="absolute right-4 top-4 z-20 h-8 w-8 rounded-md border cursor-pointer bg-zinc-700/50 p-1.5 text-zinc-100 hover:bg-zinc-700/70"
          >
            {copied ? (
              <CheckIcon className="h-full w-full text-emerald-400" />
            ) : (
              <CopyIcon className="h-full w-full" />
            )}
          </button>
          <div className="grid p-4">{children}</div>
        </div>
      </pre>
    </div>
  );
}

const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, children, href, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        className={cn(
          "font-medium underline underline-offset-4 transition-colors hover:text-purple-500",
          isExternal && "inline-flex items-center gap-1",
          className
        )}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {isExternal && <ExternalLink className="h-3 w-3 inline-block" />}
      </a>
    );
  },
  p: ({ className, ...props }) => (
    <p className={cn("leading-7 not-first:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic *:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: Pre,
  Image,
  Callout,
  Card: MdxCard,
};

export function MdxContent({ source }) {
  return (
    <div className="mdx">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
