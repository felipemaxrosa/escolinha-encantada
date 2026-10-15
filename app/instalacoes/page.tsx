import type { Metadata } from "next";
import { getFacilities } from "@/sanity/queries";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FacilitiesShowcase } from "@/components/sections/facilities-showcase";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export const metadata: Metadata = {
  title: "Instalações",
  description:
    "Espaços acolhedores, pensados para o conforto e a segurança das crianças, no centro de Coimbra.",
};

export default async function InstalacoesPage() {
  const facilities = await getFacilities();

  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge tone="secondary">Instalações</Badge>
          <h1 className="mt-4 text-5xl">Espaços para crescer em segurança</h1>
          <p className="mt-3 text-lg text-ink-soft">
            Ambientes acolhedores, pensados ao pormenor para o bem-estar de cada
            criança.
          </p>
        </div>

        {facilities.length > 0 ? (
          <FacilitiesShowcase facilities={facilities} />
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
