"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useMotionAllowed } from "@/lib/a11y";
import { galleryCategories, type GalleryCategory, type GalleryItem, type GalleryVideo } from "@/lib/gallery";
import { boxButton } from "../styles";
import { GalleryLightbox } from "./GalleryLightbox";

type Filter = "all" | GalleryCategory;

const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "הכול" }, ...galleryCategories];

/** How many pictures "all" shows before the visitor asks for the rest. */
const FIRST_SCREEN = 16;

/** A video tile plays silently while it is on screen, and never for visitors who asked for less motion. */
function LoopingVideo({ item }: { item: GalleryVideo }) {
  const video = useRef<HTMLVideoElement>(null);
  // false for a visitor who asked the system for less motion, or who pressed "stop motion" in the accessibility menu
  const motion = useMotionAllowed();

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (!motion) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motion]);

  return (
    <video
      ref={video}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function PlayBadge() {
  return (
    <span
      className="absolute bottom-2 start-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-[#141210]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
        <path d="M3 1.5v9l7.5-4.5z" />
      </svg>
    </span>
  );
}

/**
 * One tile of the justified rows: the width grows with the picture's aspect ratio, so every picture keeps its
 * own proportions and the pictures of a row share one height (see --row on the list).
 */
function Tile({ item, id, onOpen }: { item: GalleryItem; id: string; onOpen: () => void }) {
  const style = {
    "--w": item.width,
    "--h": item.height,
    backgroundColor: item.color,
    flexGrow: "calc(var(--w) * 100 / var(--h))",
    flexBasis: "calc(var(--w) * var(--row) / var(--h))",
  } as CSSProperties;

  return (
    <li className="group relative overflow-hidden" style={style}>
      <i aria-hidden="true" className="block" style={{ paddingBottom: "calc(var(--h) / var(--w) * 100%)" }} />
      <button
        type="button"
        id={id}
        onClick={onOpen}
        aria-label={item.kind === "video" ? `סרטון: ${item.alt}` : item.alt}
        aria-haspopup="dialog"
        className="absolute inset-0 cursor-zoom-in"
      >
        {item.kind === "photo" ? (
          <Image
            src={item.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <LoopingVideo item={item} />
            <PlayBadge />
          </>
        )}
      </button>
    </li>
  );
}

/** The gallery: tabs by kind of meal, justified rows of pictures and clips, and a full-screen viewer. */
export function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const uid = useId();
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const inFilter = filter === "all" ? items : items.filter((item) => item.category === filter);
  const shown = filter === "all" && !showAll ? inFilter.slice(0, FIRST_SCREEN) : inFilter;
  const hiddenCount = inFilter.length - shown.length;

  const tabId = (id: Filter) => `${uid}-tab-${id}`;
  const panelId = `${uid}-panel`;
  const tileId = (i: number) => `${uid}-tile-${i}`;

  function select(next: Filter) {
    setFilter(next);
    setShowAll(false);
  }

  // The page is right-to-left: the next tab is to the left.
  function onTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const ids = tabs.map((t) => t.id);
    const i = ids.indexOf(filter);
    let to = i;
    if (e.key === "ArrowLeft") to = (i + 1) % ids.length;
    else if (e.key === "ArrowRight") to = (i - 1 + ids.length) % ids.length;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = ids.length - 1;
    else return;
    e.preventDefault();
    select(ids[to]);
    document.getElementById(tabId(ids[to]))?.focus();
  }

  // After "show all" the button disappears: keep the keyboard where the new pictures begin.
  useEffect(() => {
    if (showAll) document.getElementById(`${uid}-tile-${FIRST_SCREEN}`)?.focus({ preventScroll: true });
  }, [showAll, uid]);

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div
        role="tablist"
        aria-label="סוגי הגלריה"
        onKeyDown={onTabKeyDown}
        className="flex flex-wrap justify-center gap-x-7 gap-y-3 md:gap-x-10"
      >
        {tabs.map((tab) => {
          const active = tab.id === filter;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId(tab.id)}
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => select(tab.id)}
              className={`border-b pb-2 text-[0.75rem] tracking-[1.8px] transition-colors md:text-[0.78125rem] md:tracking-[2px] ${
                active ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={panelId} aria-labelledby={tabId(filter)}>
        <ul className="flex flex-wrap gap-1.5 [--row:150px] after:grow-[1000000000] after:content-[''] md:gap-2 md:[--row:200px]">
          {shown.map((item, i) => (
            <Tile key={item.id} item={item} id={tileId(i)} onOpen={() => setOpen(i)} />
          ))}
        </ul>

        {hiddenCount > 0 && (
          <div className="mt-10 flex justify-center md:mt-14">
            <button type="button" onClick={() => setShowAll(true)} className={boxButton}>
              הצגת כל הגלריה
            </button>
          </div>
        )}
      </div>

      <GalleryLightbox items={shown} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
    </div>
  );
}
