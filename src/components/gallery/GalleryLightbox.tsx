"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { galleryCategories, type GalleryItem } from "@/lib/gallery";
import { Chevron, Close } from "../icons";

const SWIPE_PX = 60;

// A dark tint behind the outline keeps the controls visible on bright photos too.
const control =
  "flex h-11 w-11 items-center justify-center border border-white/45 bg-[#141210]/55 text-white transition-colors hover:bg-white hover:text-ink";

/**
 * Full-screen viewer for the gallery, on the native <dialog>: Esc closes it, focus is trapped and
 * restored by the browser, a click beside the picture closes it. The page is right-to-left, so
 * the next picture is to the left: ArrowLeft and a swipe to the right both go forward.
 */
export function GalleryLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;
  const item = index === null ? null : items[index];
  const itemId = item?.id;

  // A clip starts by itself, except for visitors who asked for less motion: they get the controls.
  useEffect(() => {
    const el = video.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.play().catch(() => {});
  }, [itemId]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (isOpen && !el.open) el.showModal();
    if (!isOpen && el.open) el.close();
  }, [isOpen]);

  // The page behind must not scroll while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  function go(step: number) {
    if (index === null) return;
    onIndexChange((index + step + items.length) % items.length);
  }

  function onPointerDown(e: PointerEvent) {
    swipe.current = e.pointerType === "mouse" ? null : { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e: PointerEvent) {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx > 0 ? 1 : -1);
  }

  const closeOnBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const neighbours =
    index === null || items.length < 2
      ? []
      : [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]];

  return (
    <dialog
      ref={dialog}
      aria-label="גלריית תמונות"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(1);
        else if (e.key === "ArrowRight") go(-1);
      }}
      className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-[#141210]/95"
    >
      {item && (
        <div className="relative h-full w-full" onClick={closeOnBackdrop}>
          <button type="button" onClick={onClose} aria-label="סגירה" className={`${control} absolute start-3 top-3 z-10 md:start-6 md:top-6`}>
            <Close className="h-4 w-4" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="הקודם"
                className={`${control} absolute start-3 top-1/2 z-10 -translate-y-1/2 md:start-6`}
              >
                <Chevron direction="start" className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="הבא"
                className={`${control} absolute end-3 top-1/2 z-10 -translate-y-1/2 md:end-6`}
              >
                <Chevron direction="end" className="h-3 w-3" />
              </button>
            </>
          )}

          <div
            className="flex h-full w-full items-center justify-center px-3 pb-14 pt-16 md:px-24"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipe.current = null;
            }}
            onClick={closeOnBackdrop}
          >
            {item.kind === "photo" ? (
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="92vw"
                quality={90}
                className="block h-auto max-h-[82dvh] w-auto max-w-full"
              />
            ) : (
              <video
                key={item.id}
                ref={video}
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                controls
                loop
                muted
                playsInline
                className="block max-h-[82dvh] max-w-full"
              />
            )}
          </div>

          <p className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-[11px] tracking-[2.2px] text-white/75 md:bottom-6">
            <span>{galleryCategories.find((c) => c.id === item.category)?.label}</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">
              {(index ?? 0) + 1} / {items.length}
            </span>
          </p>

          {/* warm the cache for the neighbours */}
          {neighbours.map(
            (n) =>
              n.kind === "photo" && (
                <Image
                  key={n.id}
                  src={n.src}
                  alt=""
                  aria-hidden="true"
                  width={n.width}
                  height={n.height}
                  sizes="92vw"
                  quality={90}
                  loading="eager"
                  className="hidden"
                />
              ),
          )}
        </div>
      )}
    </dialog>
  );
}
