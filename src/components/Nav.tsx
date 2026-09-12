"use client";

import { useState } from "react";
import { business, nav } from "@/lib/content";
import { Burger, Close } from "./icons";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="פתיחת תפריט"
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

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper">
          <div className="flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
            <span className="ps-[5px] font-serif text-[15px] tracking-[5px] md:ps-[7px] md:text-[19px] md:tracking-[7px]">
              SOIL
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט"
              className="p-1 transition-opacity hover:opacity-60"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-8 px-8 md:items-center">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl transition-colors hover:text-accent md:text-4xl"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 px-8 py-10 text-sm text-ink-muted md:items-center">
            <a href={business.phoneHref} className="transition-colors hover:text-accent">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="transition-colors hover:text-accent">
              {business.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
