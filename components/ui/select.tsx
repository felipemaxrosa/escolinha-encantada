import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "h-11 w-full rounded-xl border border-ink/15 bg-surface px-4 text-base text-ink outline-none transition-colors focus-visible:border-secondary-500 aria-[invalid=true]:border-error";

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select className={cn(base, className)} {...props}>
      {children}
    </select>
  );
}
