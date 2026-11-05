import { reviewCards } from "@/lib/content";
import { distribute } from "@/lib/masonry";
import { eyebrow } from "../styles";
import { GoogleSummary } from "./GoogleSummary";
import { QuoteSlider } from "./QuoteSlider";
import { ReviewFigure } from "./ReviewFigure";
import { ReviewsCarousel } from "./ReviewsCarousel";

/**
 * The testimonials section. `variant` picks how the same reviews are laid out:
 *  - "cards": large screenshot cards in a swipeable carousel
 *  - "quote": one big typeset quote at a time, original one click away
 *  - "proof": the quote beside the original screenshot
 *  - "wall":  balanced columns of screenshots (desktop), carousel below that
 */
export type ReviewsVariant = "cards" | "quote" | "proof" | "wall";

export function ReviewsSection({
  variant = "cards",
  id = "reviews",
}: {
  variant?: ReviewsVariant;
  id?: string;
}) {
  return (
    <section id={id} className="bg-paper-warm px-6 py-16 md:px-14 md:py-[124px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:gap-[52px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>המלצות מלקוחות</span>
          <h2 className="font-serif text-2xl md:text-[32px]">מה אומרים עלינו</h2>
        </div>

        <GoogleSummary />

        {variant === "cards" && (
          <ReviewsCarousel>
            {reviewCards.map((review) => (
              <ReviewFigure
                key={review.id}
                review={review}
                sizes="(max-width: 1023px) min(86vw, 420px), 460px"
                className="w-[86vw] max-w-[420px] shrink-0 snap-start self-start lg:w-[460px] lg:max-w-none"
              />
            ))}
          </ReviewsCarousel>
        )}

        {variant === "quote" && <QuoteSlider cards={reviewCards} />}
        {variant === "proof" && <QuoteSlider cards={reviewCards} proof />}

        {variant === "wall" && (
          <>
            <div className="lg:hidden">
              <ReviewsCarousel>
                {reviewCards.map((review) => (
                  <ReviewFigure
                    key={review.id}
                    review={review}
                    sizes="min(86vw, 380px)"
                    className="w-[86vw] max-w-[380px] shrink-0 snap-start self-start"
                  />
                ))}
              </ReviewsCarousel>
            </div>
            <div className="hidden items-start gap-5 lg:flex">
              {distribute(reviewCards, 3).map((column, i) => (
                <div key={i} className="flex min-w-0 flex-1 flex-col gap-5">
                  {column.map((review) => (
                    <ReviewFigure key={review.id} review={review} sizes="380px" />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
