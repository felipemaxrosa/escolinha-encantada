"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NextImage from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { GalleryItem } from "@/sanity/queries";

export function GalleryGrid({
  images,
  pageSize,
}: {
  images: GalleryItem[];
  /** Se definido e houver mais imagens, mostra paginação numerada. */
  pageSize?: number;
}) {
  const [page, setPage] = useState(0);
  // `index` é global (sobre todas as imagens) — o lightbox percorre tudo.
  const [index, setIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const pageCount = pageSize ? Math.ceil(images.length / pageSize) : 1;
  const start = pageSize ? page * pageSize : 0;
  const visible = pageSize ? images.slice(start, start + pageSize) : images;

  const open = index !== null;
  const close = useCallback(() => {
    // Ao fechar, a grelha salta para a página da foto que estava a ser vista.
    if (index !== null && pageSize) setPage(Math.floor(index / pageSize));
    setIndex(null);
  }, [index, pageSize]);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i + images.length - 1) % images.length,
      ),
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

  function goTo(p: number) {
    setIndex(null);
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <ul
        ref={gridRef}
        className="grid scroll-mt-24 grid-cols-2 gap-3 md:grid-cols-3"
      >
        {visible.map((img, i) => (
          <li key={img._id}>
            <button
              type="button"
              onClick={() => setIndex(start + i)}
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

      {pageCount > 1 && (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="Paginação"
        >
          <button
            type="button"
            onClick={() => goTo(Math.max(0, page - 1))}
            disabled={page === 0}
            aria-label="Página anterior"
            className="inline-flex size-10 items-center justify-center rounded-full bg-surface text-ink shadow-card transition hover:bg-cream disabled:opacity-40 disabled:hover:bg-surface"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          {Array.from({ length: pageCount }).map((_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Página ${p + 1}`}
              className={
                p === page
                  ? "inline-flex size-10 items-center justify-center rounded-full bg-primary-600 font-display font-semibold text-white"
                  : "inline-flex size-10 items-center justify-center rounded-full bg-surface font-display text-ink shadow-card transition hover:bg-cream"
              }
            >
              {p + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(Math.min(pageCount - 1, page + 1))}
            disabled={page === pageCount - 1}
            aria-label="Página seguinte"
            className="inline-flex size-10 items-center justify-center rounded-full bg-surface text-ink shadow-card transition hover:bg-cream disabled:opacity-40 disabled:hover:bg-surface"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </nav>
      )}

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
          <figure className="flex max-h-[88vh] flex-col items-center gap-3">
            <NextImage
              src={urlFor(images[index].image).width(1600).height(1600).fit("max").auto("format").url()}
              alt={images[index].alt}
              width={1600}
              height={1600}
              sizes="90vw"
              className="max-h-[82vh] w-auto rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <figcaption className="rounded-full bg-white/15 px-3 py-1 text-sm text-white/90">
              {index + 1} / {images.length}
            </figcaption>
          </figure>
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
