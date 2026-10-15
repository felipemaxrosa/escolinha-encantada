import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold [&_svg]:size-4",
  {
    variants: {
      tone: {
        primary: "bg-primary-100 text-primary-700",
        secondary: "bg-secondary-100 text-secondary-600",
        mint: "bg-mint-100 text-mint-600",
        accent: "bg-accent-200 text-ink",
        neutral: "bg-ink/5 text-ink-soft",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
