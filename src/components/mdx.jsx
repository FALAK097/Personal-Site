export function Mdx({code}) {
  return (
    <div dangerouslySetInnerHTML={{__html: code}} className="prose dark:prose-invert max-w-none" />
  );
}
