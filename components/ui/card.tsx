import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-surface p-6 shadow-card md:p-8",
        className,
      )}
      {...props}
    />
  );
}
