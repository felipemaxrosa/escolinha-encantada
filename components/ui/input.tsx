import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "h-11 w-full min-w-0 rounded-xl border border-ink/15 bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus-visible:border-secondary-500 aria-[invalid=true]:border-error";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  // iOS Safari rende os controlos de data nativos à largura do conteúdo,
  // ignorando width:100% → transbordam. Em ecrãs de toque removemos a
  // aparência nativa (o seletor abre à mesma ao tocar); no desktop mantém-se
  // o widget nativo com ícone de calendário.
  const isDateLike = type === "date" || type === "month";
  return (
    <input
      type={type}
      className={cn(base, isDateLike && "pointer-coarse:appearance-none", className)}
      {...props}
    />
  );
}

