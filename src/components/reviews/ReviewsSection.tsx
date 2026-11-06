import { reviewCards } from "@/lib/content";
import { eyebrow } from "../styles";
import { GoogleSummary } from "./GoogleSummary";
import { QuoteSlider } from "./QuoteSlider";

/** The testimonials section: Google rating, then the reviews as a draggable slider. */
export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-paper-warm px-6 py-16 md:px-14 md:py-[124px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:gap-[52px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>המלצות מלקוחות</span>
          <h2 className="font-serif text-2xl md:text-[2rem]">מה אומרים עלינו</h2>
        </div>

        <GoogleSummary />

        <QuoteSlider cards={reviewCards} />
      </div>
    </section>
  );
}
