import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { ExternalLink } from "lucide-react";

import { Callout } from "@/components/callout";
import { MdxCard } from "@/components/mdx-card";
import { MdxPre } from "@/components/mdx-pre";
import { cn } from "@/lib/utils";

const components = {
  h1: ({ className, children, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ className, children, ...props }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ className, children, ...props }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h6>
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
  p: ({ className, children, ...props }) => (
    <p className={cn("leading-7 not-first:mt-6", className)} {...props}>
      {children}
    </p>
  ),
  ul: ({ className, children, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ className, children, ...props }) => (
    <li className={cn("mt-2", className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, children, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic *:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ className, alt, src, ...props }) => (
    <div className="relative aspect-video my-6">
      <Image
        className={cn("rounded-md object-cover", className)}
        alt={alt}
        src={src || ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        {...props}
      />
    </div>
  ),
  hr: (props) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, children, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props}>
        {children}
      </table>
    </div>
  ),
  tr: ({ className, children, ...props }) => (
    <tr className={cn("m-0 border-t p-0 even:bg-muted", className)} {...props}>
      {children}
    </tr>
  ),
  th: ({ className, children, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ className, children, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),
  pre: MdxPre,
  Card: MdxCard,
  Callout,
};

export async function MdxContent({ source }) {
  if (!source) {
    return null;
  }

  return (
    <div className="mdx">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
