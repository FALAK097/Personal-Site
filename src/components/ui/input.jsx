import * as React from "react";

import {cn} from "@/lib/utils";

const Input = React.forwardRef(({className, type, ...props}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:border-clay-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      type={type}
      {...props}
    />
  );
});

Input.displayName = "Input";

export {Input};
