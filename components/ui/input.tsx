import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "h-11 w-full rounded-xl border border-ink/15 bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus-visible:border-secondary-500 aria-[invalid=true]:border-error";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(base, className)} {...props} />;
}
