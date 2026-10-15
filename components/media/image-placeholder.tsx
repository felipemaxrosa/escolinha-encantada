import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  /** Se fornecido, expõe a imagem decorativa com um nome acessível. */
  label?: string;
}

/** Fallback de marca (gradiente pastel) para quando falta uma foto real. */
export function ImagePlaceholder({ className, label }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary-100 via-secondary-100 to-mint-100",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ImageIcon className="size-10 text-ink/25" aria-hidden />
    </div>
  );
}
