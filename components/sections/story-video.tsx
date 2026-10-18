"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { urlFor, type ImageSource } from "@/sanity/image";
import { youtubeId } from "@/lib/youtube";

interface StoryVideoProps {
  url: string;
  title?: string;
  caption?: string;
  /** Capa opcional (Sanity). Se ausente, usa a miniatura do YouTube. */
  poster?: ImageSource;
}

/** Secção "A nossa história": embed leve de YouTube (capa + play; o iframe só
 *  carrega ao clicar — melhor performance e sem cookies até reproduzir). */
export function StoryVideo({ url, title, caption, poster }: StoryVideoProps) {
  const id = youtubeId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) return null;

  const heading = title || "A nossa história";

  return (
    <Section tone="surface">
      <Container className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl">{heading}</h2>
          {caption && <p className="mt-3 text-lg text-ink-soft">{caption}</p>}
        </div>

        <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink shadow-soft">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Reproduzir vídeo: ${heading}`}
              className="group absolute inset-0 size-full cursor-pointer"
            >
              {poster ? (
                <NextImage
                  src={urlFor(poster).width(1280).height(720).fit("crop").auto("format").url()}
                  alt=""
                  aria-hidden
                  width={1280}
                  height={720}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="size-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- miniatura do YouTube, substituída pelo iframe ao reproduzir
                <img
                  src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}
              <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15" />
              <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="size-7 translate-x-0.5 fill-current" aria-hidden />
              </span>
            </button>
          )}
        </div>
      </Container>
    </Section>
  );
}
