import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Wordmark temporário (recriação limpa refinada na Task 7 — brand). */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-bold text-ink",
        className,
      )}
    >
      <Sparkles className="size-6 text-primary-600" aria-hidden />
      <span>
        Escolinha <span className="text-primary-600">Encantada</span>
      </span>
    </span>
  );
}
