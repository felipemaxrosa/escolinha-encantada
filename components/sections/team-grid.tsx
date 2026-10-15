import NextImage from "next/image";
import { urlFor } from "@/sanity/image";
import type { TeamMemberItem } from "@/sanity/queries";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export function TeamGrid({ members }: { members: TeamMemberItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <figure
          key={m._id}
          className="overflow-hidden rounded-3xl bg-surface shadow-card"
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
          <figcaption className="p-5">
            <h3 className="text-lg">{m.name}</h3>
            {m.role && (
              <p className="text-sm font-semibold text-primary-600">{m.role}</p>
            )}
            {m.bio && <p className="mt-2 text-sm text-ink-soft">{m.bio}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
