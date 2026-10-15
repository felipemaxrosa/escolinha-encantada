import type { Metadata } from "next";
import { getGallery } from "@/sanity/queries";
import { home } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Momentos do dia a dia e os espaços da Escolinha Encantada, em Coimbra.",
};

export default async function GaleriaPage() {
  const images = await getGallery();

  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge tone="mint">Galeria</Badge>
          <h1 className="mt-4 text-5xl">{home.sections.gallery.title}</h1>
          <p className="mt-3 text-lg text-ink-soft">
            {home.sections.gallery.intro}
          </p>
        </div>

        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ImagePlaceholder key={i} className="aspect-square" />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
