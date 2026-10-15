import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="text-center">
      <Container className="flex max-w-xl flex-col items-center gap-5">
        <p className="font-display text-7xl font-bold text-primary-500">404</p>
        <h1 className="text-3xl">Página não encontrada</h1>
        <p className="text-ink-soft">
          A página que procura não existe ou foi movida.
        </p>
        <Button asChild size="lg">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </Container>
    </Section>
  );
}
