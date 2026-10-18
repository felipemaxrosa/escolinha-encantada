import { groq } from "next-sanity";
import { client } from "./client";
import { hasSanity } from "./env";
import type { ImageSource } from "./image";

export interface GalleryItem {
  _id: string;
  alt: string;
  image: ImageSource;
}
export interface TeamMemberItem {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: ImageSource;
}
export interface FacilityItem {
  _id: string;
  title: string;
  caption?: string;
  image: ImageSource;
}
export interface TestimonialItem {
  _id: string;
  quote: string;
  author?: string;
  relation?: string;
  isPlaceholder?: boolean;
}
export interface HeroSlide {
  alt: string;
  image: ImageSource;
}
export interface HeroDoc {
  heading?: string;
  subheading?: string;
  slides?: HeroSlide[];
}
export interface AboutVideo {
  youtubeUrl: string;
  title?: string;
  caption?: string;
  poster?: ImageSource;
}

/**
 * Fetch resiliente: devolve `fallback` se o Sanity não estiver configurado
 * ou se a chamada falhar (ex.: offline, TLS corporativo). O site/build nunca
 * quebram por causa do CMS — caem para placeholders. ISR por tag.
 */
async function safeFetch<T>(
  query: string,
  tags: string[],
  fallback: T,
): Promise<T> {
  if (!hasSanity) return fallback;
  try {
    return await client.fetch<T>(query, {}, { next: { tags, revalidate: 60 } });
  } catch (error) {
    console.warn(
      `[sanity] fetch falhou (${tags.join(", ")}):`,
      (error as Error).message,
    );
    return fallback;
  }
}

export function getHero(): Promise<HeroDoc | null> {
  return safeFetch<HeroDoc | null>(
    groq`*[_type == "homeHero"][0]{heading, subheading, slides[]{alt, image}}`,
    ["hero"],
    null,
  );
}

export function getAboutVideo(): Promise<AboutVideo | null> {
  return safeFetch<AboutVideo | null>(
    groq`*[_type == "aboutVideo"][0]{youtubeUrl, title, caption, poster}`,
    ["aboutVideo"],
    null,
  );
}

export function getGallery(): Promise<GalleryItem[]> {
  return safeFetch<GalleryItem[]>(
    groq`*[_type == "galleryImage"]|order(order asc){_id, alt, image}`,
    ["gallery"],
    [],
  );
}

export function getTeam(): Promise<TeamMemberItem[]> {
  return safeFetch<TeamMemberItem[]>(
    groq`*[_type == "teamMember"]|order(order asc){_id, name, role, bio, photo}`,
    ["team"],
    [],
  );
}

export function getFacilities(): Promise<FacilityItem[]> {
  return safeFetch<FacilityItem[]>(
    groq`*[_type == "facility"]|order(order asc){_id, title, caption, image}`,
    ["facilities"],
    [],
  );
}

export function getTestimonials(): Promise<TestimonialItem[]> {
  return safeFetch<TestimonialItem[]>(
    groq`*[_type == "testimonial"]|order(_createdAt asc){_id, quote, author, relation, isPlaceholder}`,
    ["testimonials"],
    [],
  );
}
