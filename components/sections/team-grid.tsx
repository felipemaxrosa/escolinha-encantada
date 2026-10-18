"use client";

import { useState } from "react";
import NextImage from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { TeamMemberItem } from "@/sanity/queries";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

function hasDetails(m: TeamMemberItem) {
  return Boolean(m.fullBio || (m.qualifications && m.qualifications.length > 0));
}

export function TeamGrid({ members }: { members: TeamMemberItem[] }) {
  const [active, setActive] = useState<TeamMemberItem | null>(null);

  return (
    <Dialog.Root
      open={!!active}
      onOpenChange={(open) => {
        if (!open) setActive(null);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => {
          const clickable = hasDetails(m);
          return (
            <div
              key={m._id}
              className="relative overflow-hidden rounded-3xl bg-surface shadow-card"
            >
              {m.photo ? (
                <NextImage
                  src={urlFor(m.photo).width(500).height(500).fit("crop").auto("format").url()}
                  alt={m.name}
                  width={500}
                  height={500}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <ImagePlaceholder className="aspect-square rounded-none" />
              )}
              <div className="p-5">
                <h3 className="text-lg">{m.name}</h3>
                {m.role && (
                  <p className="text-sm font-semibold text-primary-600">{m.role}</p>
                )}
                {m.bio && <p className="mt-2 text-sm text-ink-soft">{m.bio}</p>}
                {clickable && (
                  <span className="mt-3 inline-block text-sm font-semibold text-secondary-600">
                    Ver detalhes →
                  </span>
                )}
              </div>
              {/* Botão esticado: card inteiro clicável mantendo marcação válida. */}
              {clickable && (
                <button
                  type="button"
                  onClick={() => setActive(m)}
                  aria-label={`Ver detalhes de ${m.name}`}
                  className="absolute inset-0 cursor-pointer rounded-3xl transition hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
                />
              )}
            </div>
          );
        })}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm data-[state=open]:animate-[overlay-in]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-surface shadow-soft focus:outline-none data-[state=open]:animate-[overlay-in]">
          <Dialog.Close
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
          >
            <X className="size-5" aria-hidden />
          </Dialog.Close>

          {active && (
            <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                {active.photo && (
                  <NextImage
                    src={urlFor(active.photo).width(320).height(320).fit("crop").auto("format").url()}
                    alt={active.name}
                    width={320}
                    height={320}
                    className="size-28 rounded-full object-cover shadow-card"
                  />
                )}
                <Dialog.Title className="mt-4 font-display text-2xl font-bold text-ink">
                  {active.name}
                </Dialog.Title>
                {active.role ? (
                  <Dialog.Description className="mt-1 text-sm font-semibold text-primary-600">
                    {active.role}
                  </Dialog.Description>
                ) : (
                  <Dialog.Description className="sr-only">
                    Perfil de {active.name}
                  </Dialog.Description>
                )}
              </div>

              {(active.fullBio || active.bio) && (
                <p className="mt-5 text-ink-soft">{active.fullBio || active.bio}</p>
              )}

              {active.qualifications && active.qualifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold tracking-wide text-ink uppercase">
                    Formação
                  </h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft marker:text-secondary-500">
                    {active.qualifications.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
