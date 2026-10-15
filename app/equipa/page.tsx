import type { Metadata } from "next";
import { getTeam } from "@/sanity/queries";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { TeamGrid } from "@/components/sections/team-grid";
import { HealthPartners } from "@/components/sections/health-partners";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export const metadata: Metadata = {
  title: "A Nossa Equipa",
  description:
    "Educadoras dedicadas e parcerias de saúde na Escolinha Encantada, em Coimbra.",
};

export default async function EquipaPage() {
  const members = await getTeam();

  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge tone="primary">Equipa</Badge>
            <h1 className="mt-4 text-5xl">Quem cuida dos seus filhos</h1>
            <p className="mt-3 text-lg text-ink-soft">
              Uma equipa criativa e dedicada, que acompanha cada criança com
              afeto e atenção individual.
            </p>
          </div>

          {members.length > 0 ? (
            <TeamGrid members={members} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-3xl bg-surface shadow-card"
                >
                  <ImagePlaceholder className="aspect-square rounded-none" />
                  <div className="p-5">
                    <div className="h-4 w-24 rounded bg-ink/10" />
                    <div className="mt-2 h-3 w-16 rounded bg-ink/5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <HealthPartners />
        </Container>
      </Section>
    </>
  );
}
