import * as React from "react";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-cream",
  surface: "bg-surface",
  primary: "bg-primary-100/50",
  secondary: "bg-secondary-100/60",
  mint: "bg-mint-100/60",
} as const;

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: keyof typeof tones;
}

export function Section({
  tone = "cream",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", tones[tone], className)}
      {...props}
    />
  );
}
