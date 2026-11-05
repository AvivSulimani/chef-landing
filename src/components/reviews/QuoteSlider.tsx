"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewCard } from "@/lib/content";
import { Chevron, Star } from "../icons";
import { eyebrow, textLink } from "../styles";
import { OriginalReview } from "./OriginalReview";

const AUTOPLAY_MS = 8000;
const DRAG_START_PX = 6;
const FLICK_PX_PER_MS = 0.4;

const arrow =
  "flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-ink/30 transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-30";

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
 * Reviews as a horizontal slider: a large typeset quote, and on wide screens the
 * original screenshot beside it.
 *
 * It is a native scroll-snap container, so touch swipes and trackpad gestures
 * behave like the rest of the platform. A mouse can also click-and-drag: the
 * slides follow the pointer, and on release a flick or a pull past 15% moves one
 * slide, otherwise it settles back. A drag never counts as a click.
 *
 * Autoplay runs while the section is on screen, pauses on hover and focus, and
 * stops for good once the visitor navigates. It does not loop. Respects reduced
 * motion.
 */
export function QuoteSlider({ cards }: { cards: ReviewCard[] }) {
  const count = cards.length;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const frame = useRef(0);
  const swallowClick = useRef(false);
  const drag = useRef({ id: -1, startX: 0, startScroll: 0, moved: false, lastX: 0, lastT: 0, speed: 0 });

  const scrollToIndex = useCallback(
    (to: number) => {
      const el = track.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(count - 1, to));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // The page is RTL, so later slides sit to the left and scrollLeft runs negative.
      el.scrollTo({ left: -clamped * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  function navigate(to: number) {
    setStopped(true);
    scrollToIndex(to);
  }

  // The visible slide follows the scroll position.
  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = track.current;
      if (el && el.clientWidth) setIndex(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
    });
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
    if (!visible || hold || stopped || dragging || index >= count - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => scrollToIndex(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [visible, hold, stopped, dragging, index, count, scrollToIndex]);

  // --- click and drag (mouse only; touch scrolls natively) -------------------

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = track.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      lastX: e.clientX,
      lastT: e.timeStamp,
      speed: 0,
    };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = track.current;
    const d = drag.current;
    if (!el || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;

    if (!d.moved) {
      if (Math.abs(dx) < DRAG_START_PX) return;
      d.moved = true;
      // capture only now, so a plain click still reaches the buttons inside
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      setStopped(true);
      setDragging(true);
    }

    // dragging the content to the right (dx > 0) reveals later slides in RTL
    el.scrollLeft = d.startScroll - dx;

    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.speed = 0.8 * d.speed + 0.2 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const el = track.current;
    const d = drag.current;
    if (!el || d.id !== e.pointerId) return;
    d.id = -1;
    if (!d.moved) return;

    el.releasePointerCapture(e.pointerId);
    swallowClick.current = true;
    window.setTimeout(() => {
      swallowClick.current = false;
    }, 0);

    const width = el.clientWidth;
    const dx = e.clientX - d.startX;
    let target = Math.round(-el.scrollLeft / width);
    if (Math.abs(d.speed) > FLICK_PX_PER_MS || Math.abs(dx) > width * 0.15) {
      const direction = (Math.abs(d.speed) > FLICK_PX_PER_MS ? d.speed : dx) > 0 ? 1 : -1;
      target = Math.round(-d.startScroll / width) + direction;
    }

    el.style.scrollSnapType = "";
    el.style.scrollBehavior = "";
    setDragging(false);
    scrollToIndex(target);
  }

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
        if (e.key === "ArrowLeft") navigate(index + 1);
        if (e.key === "ArrowRight") navigate(index - 1);
      }}
      className="flex flex-col items-center gap-9 outline-none md:gap-12"
    >
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (swallowClick.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        aria-live={stopped || hold ? "polite" : "off"}
        className={`flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {cards.map((review, i) => (
          <div
            key={review.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} מתוך ${count}`}
            inert={i !== index}
            className="flex w-full shrink-0 snap-start snap-always items-center"
          >
            <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-10 px-1 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:text-start">
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
                    draggable={false}
                    className="block h-auto max-h-[560px] w-auto max-w-[400px]"
                  />
                </figure>
              </OriginalReview>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 md:gap-7">
        <button
          type="button"
          onClick={() => navigate(index - 1)}
          disabled={index === 0}
          aria-label="ההמלצה הקודמת"
          className={arrow}
        >
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
              onClick={() => navigate(i)}
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
        <button
          type="button"
          onClick={() => navigate(index + 1)}
          disabled={index === count - 1}
          aria-label="ההמלצה הבאה"
          className={arrow}
        >
          <Chevron direction="end" className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
