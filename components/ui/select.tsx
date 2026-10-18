import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "h-11 w-full min-w-0 appearance-none rounded-xl border border-ink/15 bg-surface pr-11 pl-4 text-base text-ink outline-none transition-colors hover:border-ink/25 focus-visible:border-secondary-500 aria-[invalid=true]:border-error";

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(base, className)} {...props}>
        {children}
      </select>
      {/* Chevron próprio — o nativo foi removido com appearance-none.
          pointer-events-none deixa o clique passar para o <select>. */}
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-ink-soft"
      />
    </div>
  );
}
