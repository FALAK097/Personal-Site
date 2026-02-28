export const FormattedText = ({ text }) => {
  const segments = text.split(/(\[.*?\]\(.*?\)|`.*?`|_.*?_)/g);

  return (
    <span className="inline">
      {segments.map((segment, index) => {
        if (segment.match(/^\[.*?\]\(.*?\)$/)) {
          const [label, url] = segment.slice(1, -1).split("](");
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay-500 hover:text-clay-600 underline"
            >
              {label}
            </a>
          );
        }
        if (segment.match(/^`.*?`$/)) {
          const content = segment.slice(1, -1);
          return (
            <span key={index} className="text-clay-600 dark:text-clay-400">
              {content}
            </span>
          );
        }
        if (segment.match(/^_.*?_$/)) {
          const content = segment.slice(1, -1);
          return <em key={index}>{content}</em>;
        }
        return <span key={index}>{segment}</span>;
      })}
    </span>
  );
};
