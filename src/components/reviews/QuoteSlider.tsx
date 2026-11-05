"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReviewCard } from "@/lib/content";
import { Chevron, Star } from "../icons";
import { eyebrow, textLink } from "../styles";
import { OriginalReview } from "./OriginalReview";

const AUTOPLAY_MS = 8000;
const SWIPE_PX = 50;

const arrow =
  "flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-ink/30 transition-colors hover:border-ink hover:bg-ink hover:text-paper";

function QuoteMark() {
  return (
    <svg viewBox="0 0 48 36" className="h-7 w-9 text-ink/15 md:h-9 md:w-12" fill="currentColor" aria-hidden="true">
      <path d="M0 36V21C0 9 6 2 18 0l2 5C13 7 10 11 10 16h9v20H0zm28 0V21C28 9 34 2 46 0l2 5c-7 2-10 6-10 11h9v20H28z" />
    </svg>
  );
}

function Attribution({ review }: { review: ReviewCard }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[15px]">{review.author}</span>
      <span className={`${eyebrow} flex items-center gap-2.5`}>
        {review.source === "Google" && (
          <span className="flex gap-0.5 text-ink" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-2.5 w-2.5" />
            ))}
          </span>
        )}
        {review.source.toUpperCase()}
      </span>
    </div>
  );
}

/**
 * One review at a time, as a large typeset quote that cross-fades. The original
 * screenshot stays one click away. With `proof`, it is shown beside the quote.
 *
 * Autoplay runs only while the section is on screen, pauses on hover and focus,
 * and stops for good once the visitor navigates. Respects reduced motion.
 */
export function QuoteSlider({
  cards,
  proof = false,
}: {
  cards: ReviewCard[];
  proof?: boolean;
}) {
  const count = cards.length;
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  function go(to: number) {
    setIndex(((to % count) + count) % count);
    setStopped(true);
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hold || stopped || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [visible, hold, stopped, count]);

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="המלצות של לקוחות"
      tabIndex={0}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onKeyDown={(e) => {
        // RTL: the next slide is to the left
        if (e.key === "ArrowLeft") go(index + 1);
        if (e.key === "ArrowRight") go(index - 1);
      }}
      onPointerDown={(e) => {
        swipeStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) < SWIPE_PX) return;
        go(dx > 0 ? index + 1 : index - 1);
      }}
      className="flex flex-col items-center gap-9 outline-none md:gap-12"
    >
      {/* all slides share one grid cell, so the tallest sets the height and
          nothing jumps while they cross-fade */}
      <div className="grid w-full" aria-live={stopped || hold ? "polite" : "off"}>
        {cards.map((review, i) => {
          const active = i === index;
          return (
            <div
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} מתוך ${count}`}
              inert={!active}
              className={`col-start-1 row-start-1 flex items-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {proof ? (
                <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:text-start">
                  <div className="flex max-w-[560px] flex-col items-center gap-7 lg:items-start">
                    <QuoteMark />
                    <p className="text-balance font-serif text-[22px] leading-[1.65] md:text-[28px] md:leading-[1.6]">
                      {review.excerpt}
                    </p>
                    <Attribution review={review} />
                    <OriginalReview review={review} className={`${textLink} lg:hidden`}>
                      לצפייה בביקורת המקורית
                    </OriginalReview>
                  </div>
                  <OriginalReview
                    review={review}
                    label={`פתיחת הביקורת המקורית של ${review.author}`}
                    className="hidden shrink-0 cursor-zoom-in lg:block"
                  >
                    <figure className="border border-rule bg-white shadow-[0_30px_70px_-36px_rgba(47,46,46,0.45)]">
                      <Image
                        src={review.image.src}
                        alt=""
                        width={review.image.width}
                        height={review.image.height}
                        sizes="400px"
                        quality={90}
                        className="block h-auto max-h-[560px] w-auto max-w-[400px]"
                      />
                    </figure>
                  </OriginalReview>
                </div>
              ) : (
                <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-7 text-center md:gap-9">
                  <QuoteMark />
                  <p className="text-balance font-serif text-[22px] leading-[1.65] md:text-[32px] md:leading-[1.55]">
                    {review.excerpt}
                  </p>
                  <div className="flex flex-col items-center gap-6">
                    <Attribution review={review} />
                    <OriginalReview review={review} className={textLink}>
                      לצפייה בביקורת המקורית
                    </OriginalReview>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-5 md:gap-7">
        <button type="button" onClick={() => go(index - 1)} aria-label="ההמלצה הקודמת" className={arrow}>
          <Chevron direction="start" className="h-3 w-3" />
        </button>
        <div className="flex items-center gap-1.5 md:gap-2.5" role="tablist" aria-label="בחירת המלצה">
          {cards.map((review, i) => (
            <button
              key={review.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`המלצה ${i + 1}`}
              onClick={() => go(i)}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  i === index ? "w-6 bg-ink md:w-8" : "w-3 bg-ink/25 group-hover:bg-ink/60 md:w-4"
                }`}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="ההמלצה הבאה" className={arrow}>
          <Chevron direction="end" className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
