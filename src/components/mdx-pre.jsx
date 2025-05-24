"use client";

import * as React from "react";
import { CopyIcon, CheckIcon } from "lucide-react";

export function MdxPre({ children, ...props }) {
  const ref = React.useRef(null);
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    if (ref.current) {
      const codeElement = ref.current.querySelector("code") || ref.current;
      const code = codeElement.textContent;
      if (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="relative" {...props}>
      <pre ref={ref}>
        <div className="relative">
          <button
            onClick={onCopy}
            className="absolute right-4 top-4 z-20 h-8 w-8 rounded-md border cursor-pointer bg-zinc-700/50 p-1.5 text-zinc-100 hover:bg-zinc-700/70"
            aria-label="Copy code"
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
