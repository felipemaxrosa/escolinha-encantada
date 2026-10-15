import type { Metadata } from "next";
import { getFacilities } from "@/sanity/queries";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export const metadata: Metadata = {
  title: "Instalações",
  description:
    "Instalações construídas de raiz, com mais de 1800 m² pensados para o conforto e a segurança das crianças, no centro de Coimbra.",
};

export default async function InstalacoesPage() {
  const facilities = await getFacilities();
  // As fotos das instalações vivem como documentos `facility` no Sanity.
  // Reutilizamos a grelha + lightbox da galeria (só precisa de _id/alt/image).
  const images = facilities.map((f) => ({
    _id: f._id,
    alt: f.caption || "Instalações da Escolinha Encantada",
    image: f.image,
  }));

  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge tone="secondary">Instalações</Badge>
          <h1 className="mt-4 text-5xl">Espaços para crescer em segurança</h1>
          <p className="mt-3 text-lg text-ink-soft">
            Instalações construídas de raiz em 2013, com mais de 1800 m²
            pensados ao pormenor para o conforto e a segurança de cada criança.
          </p>
        </div>

        {images.length > 0 ? (
          <GalleryGrid images={images} pageSize={12} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ImagePlaceholder key={i} className="aspect-[4/3]" />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
