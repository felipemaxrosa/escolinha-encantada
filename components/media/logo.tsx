import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Wordmark da marca: peças de puzzle + nome "Escolinha Encantada".
 *  A imagem é decorativa (aria-hidden) — o texto ao lado já nomeia a marca. */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-bold text-ink",
        className,
      )}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        aria-hidden
        width={144}
        height={144}
        loading="eager"
        className="h-[1.4em] w-auto shrink-0 select-none"
      />
      <span>
        Escolinha <span className="text-primary-600">Encantada</span>
      </span>
    </span>
  );
}
