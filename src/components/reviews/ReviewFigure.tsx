import Image from "next/image";
import type { ReviewCard } from "@/lib/content";

/** One review screenshot in a thin frame. */
export function ReviewFigure({
  review,
  sizes,
  className = "",
}: {
  review: ReviewCard;
  sizes: string;
  className?: string;
}) {
  // Chat screenshots sit on WhatsApp's beige wallpaper, so the frame matches it
  // while the image loads.
  const tint = review.source === "WhatsApp" ? "bg-[#f0ece4]" : "bg-white";
  return (
    <figure className={`overflow-hidden border border-rule ${tint} ${className}`}>
      <Image
        src={review.image.src}
        alt={review.alt}
        width={review.image.width}
        height={review.image.height}
        sizes={sizes}
        quality={90}
        className="block h-auto w-full"
      />
      <figcaption className="sr-only">
        {review.source} · {review.author}: {review.transcript}
      </figcaption>
    </figure>
  );
}
