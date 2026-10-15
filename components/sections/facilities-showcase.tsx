import NextImage from "next/image";
import { urlFor } from "@/sanity/image";
import type { FacilityItem } from "@/sanity/queries";

export function FacilitiesShowcase({
  facilities,
}: {
  facilities: FacilityItem[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {facilities.map((f) => (
        <figure
          key={f._id}
          className="overflow-hidden rounded-3xl bg-surface shadow-card"
        >
          <NextImage
            src={urlFor(f.image).width(600).height(450).fit("crop").auto("format").url()}
            alt={f.title}
            width={600}
            height={450}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="p-5">
            <h3 className="text-lg">{f.title}</h3>
            {f.caption && <p className="mt-1 text-sm text-ink-soft">{f.caption}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
