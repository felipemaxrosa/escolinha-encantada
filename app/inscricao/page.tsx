import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrollmentForm } from "@/components/forms/enrollment-form";
import { FacebookIcon } from "@/components/media/social-icons";
import { getPrograms } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Inscrições e Contactos",
  description:
    "Inscreva o seu filho ou agende uma visita à Escolinha Encantada, creche e pré-escolar em Coimbra.",
};

export default async function InscricaoPage() {
  const c = site.contact;
  const programs = await getPrograms();
  const mapQuery = encodeURIComponent(
    `${c.street}, ${c.postalCode} ${c.city}, Portugal`,
  );

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Badge tone="primary">Inscrição</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl">Inscreva o seu filho</h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            Preencha os dados e entraremos em contacto. Pode também pedir para
            agendar uma visita à escola.
          </p>
          <Card className="mt-8">
            <EnrollmentForm
              programs={programs.map((p) => ({ slug: p.slug, name: p.name }))}
            />
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="space-y-4">
            <h2 className="text-xl">Contactos</h2>
            <ul className="space-y-3 text-ink-soft">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
                <span>
                  {c.street}
                  <br />
                  {c.area}, {c.postalCode} {c.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-primary-600" aria-hidden />
                <span>
                  {c.landlines.join(" · ")} · {c.mobile}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-primary-600" aria-hidden />
                <a href={`mailto:${c.email}`} className="hover:text-primary-700">
                  {c.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FacebookIcon className="shrink-0 text-primary-600" />
                <a
                  href={c.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-700"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </Card>

          <div className="overflow-hidden rounded-3xl shadow-card">
            <iframe
              title="Mapa — Escolinha Encantada"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="text-center text-xs text-ink-soft">
            <a
              href={c.complaintsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary-700"
            >
              Livro de Reclamações
            </a>
          </p>
        </aside>
      </Container>
    </Section>
  );
}
