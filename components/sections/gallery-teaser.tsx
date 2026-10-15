import Link from "next/link";
import { home } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/media/image-placeholder";
import { SanityImage } from "@/components/media/sanity-image";
import type { GalleryItem } from "@/sanity/queries";

export function GalleryTeaser({ images }: { images: GalleryItem[] }) {
  const preview = images.slice(0, 6);

  return (
    <Section tone="mint">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl">{home.sections.gallery.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">
            {home.sections.gallery.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {preview.length > 0
            ? preview.map((img) => (
                <SanityImage
                  key={img._id}
                  image={img.image}
                  alt={img.alt}
                  width={500}
                  height={500}
                  sizes="(min-width:768px) 33vw, 50vw"
                  className="aspect-square w-full rounded-3xl object-cover shadow-card"
                />
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <ImagePlaceholder key={i} className="aspect-square" />
              ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/galeria">Ver galeria</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
