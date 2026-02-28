import * as React from "react";

import {cn} from "@/lib/utils";

const Textarea = React.forwardRef(({className, ...props}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:border-clay-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export {Textarea};
