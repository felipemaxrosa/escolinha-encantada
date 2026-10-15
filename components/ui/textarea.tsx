import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "min-h-28 w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus-visible:border-secondary-500 aria-[invalid=true]:border-error";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return <textarea className={cn(base, className)} {...props} />;
}
