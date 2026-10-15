"use client";

import { useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { GalleryItem } from "@/sanity/queries";

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + images.length - 1) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img._id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl shadow-card"
            >
              <NextImage
                src={urlFor(img.image).width(600).height(600).fit("crop").auto("format").url()}
                alt={img.alt}
                width={600}
                height={600}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {open && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de imagens"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={close}
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:left-6"
          >
            <ChevronLeft className="size-7" aria-hidden />
          </button>
          <NextImage
            src={urlFor(images[index].image).width(1400).height(1050).fit("max").auto("format").url()}
            alt={images[index].alt}
            width={1400}
            height={1050}
            className="max-h-[85vh] w-auto rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Imagem seguinte"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:right-6"
          >
            <ChevronRight className="size-7" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
