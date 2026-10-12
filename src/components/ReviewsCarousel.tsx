"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Chevron } from "./icons";

const GAP = 24;

/**
 * Horizontal, scroll-snapping track with prev/next controls and a hairline
 * progress bar. Written for RTL: `scrollLeft` runs 0 → negative, so every
 * position is read through Math.abs.
 */
export function ReviewsCarousel({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ offset: 0, size: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el || el.scrollWidth === 0) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setView({
      offset: pos / el.scrollWidth,
      size: Math.min(1, el.clientWidth / el.scrollWidth),
      atStart: pos < 4,
      atEnd: max <= 4 || pos > max - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // The observer fires once on observe, which also gives the first measurement.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  function go(direction: "prev" | "next") {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? el.clientWidth) + GAP;
    // In RTL the next card sits to the left, i.e. towards negative scrollLeft.
    el.scrollBy({ left: direction === "next" ? -step : step, behavior: "smooth" });
  }

  const control =
    "flex h-[38px] w-[38px] items-center justify-center border border-ink/30 transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-30";

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div
        ref={track}
        onScroll={measure}
        role="region"
        aria-roledescription="carousel"
        aria-label="המלצות של לקוחות"
        tabIndex={0}
        className="relative -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto scroll-smooth px-6 pb-1 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="flex items-center gap-6 border-t border-rule pt-5 md:pt-6">
        <div className="relative h-px flex-1 bg-rule" aria-hidden="true">
          <div
            className="absolute inset-y-[-0.5px] bg-ink transition-[right,width] duration-200"
            style={{
              right: `${view.offset * 100}%`,
              width: `${view.size * 100}%`,
            }}
          />
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => go("prev")}
            disabled={view.atStart}
            aria-label="ההמלצה הקודמת"
            className={control}
          >
            <Chevron direction="start" className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => go("next")}
            disabled={view.atEnd}
            aria-label="ההמלצה הבאה"
            className={control}
          >
            <Chevron direction="end" className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
