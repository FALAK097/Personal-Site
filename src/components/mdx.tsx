interface MdxProps {
  code: string;
}

export function Mdx({code}: MdxProps) {
  return (
    <div dangerouslySetInnerHTML={{__html: code}} className="prose dark:prose-invert max-w-none" />
  );
}
