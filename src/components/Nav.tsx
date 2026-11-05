"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { business, nav } from "@/lib/content";
import { Burger, Close } from "./icons";

/** How long the menu takes to fade out. Keep it equal to the `.menu-panel` fade-out duration in globals.css. */
const FADE_OUT_MS = 260;

/** Each item of the menu rises into place a little after the one before it. */
const rise = (i: number) => ({ "--d": `${120 + i * 70}ms` }) as CSSProperties;

/**
 * The menu is a full-screen native <dialog>: it fades in, its links rise into place one after another, and it fades
 * out again when closed (the timings live in globals.css). The browser traps focus inside it, makes the page behind
 * inert and closes it on Esc (animated here too), then hands focus back to the burger button.
 */
export function Nav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [shown, setShown] = useState(false);

  function open() {
    const el = dialog.current;
    if (!el) return;
    window.clearTimeout(timer.current);
    if (!el.open) {
      el.showModal();
      // Let the transparent starting state register, so that the fade really runs.
      el.getBoundingClientRect();
    }
    setShown(true);
  }

  function close() {
    const el = dialog.current;
    if (!el?.open) return;
    setShown(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => el.close(), FADE_OUT_MS);
  }

  // The page behind must not scroll while the menu is open.
  useEffect(() => {
    if (!shown) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [shown]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={open}
            aria-label="פתיחת תפריט"
            aria-haspopup="dialog"
            className="p-1 text-white transition-opacity hover:opacity-70"
          >
            <Burger className="h-3 w-5" />
          </button>
          <span className="ps-[5px] font-serif text-[15px] tracking-[5px] text-white md:ps-[7px] md:text-[19px] md:tracking-[7px]">
            SOIL
          </span>
        </div>
        <a
          href="#contact"
          className="text-[10.5px] tracking-[1.6px] text-white transition-colors hover:text-accent md:text-xs md:tracking-[2.4px]"
        >
          הזמינו ארוחה
        </a>
      </header>

      <dialog
        ref={dialog}
        data-shown={shown}
        aria-label="תפריט"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setShown(false)}
        className="menu-panel m-0 h-dvh max-h-none w-dvw max-w-none flex-col border-0 bg-paper p-0 text-ink open:flex"
      >
        <div className="flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
          <span className="ps-[5px] font-serif text-[15px] tracking-[5px] md:ps-[7px] md:text-[19px] md:tracking-[7px]">
            SOIL
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="סגירת תפריט"
            className="p-1 transition-opacity hover:opacity-60"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="ניווט ראשי" className="flex flex-1 flex-col justify-center gap-8 px-8 md:items-center">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-serif text-3xl transition-colors hover:text-accent md:text-4xl"
            >
              <span className="menu-rise block" style={rise(i)}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div
          className="menu-rise flex flex-col gap-2 px-8 py-10 text-sm text-ink-muted md:items-center"
          style={rise(nav.length)}
        >
          <a href={business.phoneHref} className="transition-colors hover:text-accent">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="transition-colors hover:text-accent">
            {business.email}
          </a>
        </div>
      </dialog>
    </>
  );
}
