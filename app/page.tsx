import Link from "next/link";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <Section className="text-center">
      <Container className="flex max-w-3xl flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-2">
          <Badge tone="primary">Berçário</Badge>
          <Badge tone="mint">Creche</Badge>
          <Badge tone="secondary">Pré-escolar</Badge>
        </div>
        <h1 className="text-5xl text-balance md:text-6xl">{site.tagline}</h1>
        <p className="max-w-2xl text-lg text-ink-soft">{site.description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/programas">Ver programas</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
