import NextImage from "next/image";
import { urlFor, type ImageSource } from "@/sanity/image";
import { cn } from "@/lib/utils";

interface SanityImageProps {
  image: ImageSource;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** next/image a partir de uma imagem do Sanity (crop + hotspot + formato automático). */
export function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  sizes,
  priority,
  className,
}: SanityImageProps) {
  const src = urlFor(image)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn(className)}
    />
  );
}
