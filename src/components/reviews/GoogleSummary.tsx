import { googleSummary } from "@/lib/content";
import { eyebrow } from "../styles";
import { Star } from "../icons";

/** "5.0 ★★★★★ ביקורות בגוגל", linking to the Google listing. */
export function GoogleSummary() {
  return (
    <a
      href={googleSummary.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-4 md:gap-5"
    >
      <span className="font-serif text-[32px] leading-none md:text-[40px]">
        {googleSummary.rating}
      </span>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1" aria-label={`${googleSummary.rating} כוכבים`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
        <span className={`${eyebrow} transition-colors group-hover:text-ink`}>
          ביקורות בגוגל
        </span>
      </div>
    </a>
  );
}
