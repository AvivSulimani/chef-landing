"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  defaultPrefs,
  isDefault,
  setPrefs,
  syncDocument,
  textPercent,
  useA11yPrefs,
  type A11yPrefs,
  type Contrast,
  type TextStep,
} from "@/lib/a11y";
import { Close } from "./icons";
import { inlineLink } from "./styles";

/** The universal access symbol: a figure with arms spread, in a circle. */
function AccessIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10.4" />
      <circle cx="12" cy="6.6" r="1.35" fill="currentColor" stroke="none" />
      <path d="M6.6 9.5c3.6 1.1 7.2 1.1 10.8 0" />
      <path d="M12 10.1v3.4" />
      <path d="M12 13.5l-2.4 4.6M12 13.5l2.4 4.6" />
    </svg>
  );
}

const stepButton =
  "flex h-11 w-11 items-center justify-center border border-ink/60 text-[0.9375rem] transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-35";

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="flex min-h-11 items-center justify-center border border-ink/60 px-2 py-2 text-center text-[0.8125rem] leading-tight transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {children}
    </button>
  );
}

/**
 * The accessibility button (bottom corner of every page) and the panel it opens: text size, higher contrast, a
 * dark background, underlined links, a plain typeface, looser text spacing, and a stop for everything that moves.
 * The choices are kept in this browser only (see lib/a11y.ts). It is a disclosure, not a modal: the page stays
 * usable behind it, Esc closes it, and it closes by itself when focus moves out of it.
 *
 * Not a substitute for an accessible site (the page itself follows the Israeli standard 5568 / WCAG AA); it is a
 * set of extra controls on top of it.
 */
export function AccessibilityMenu() {
  const uid = useId();
  const prefs = useA11yPrefs();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // A choice saved earlier is normally on <html> already (the script in <head>); this covers a page without it.
  useEffect(() => {
    syncDocument();
  }, []);

  useEffect(() => {
    if (open) panel.current?.focus();
  }, [open]);

  const change = (patch: Partial<A11yPrefs>) => setPrefs({ ...prefs, ...patch });
  const toggleContrast = (value: Exclude<Contrast, "off">) =>
    change({ contrast: prefs.contrast === value ? "off" : value });
  const nextStep = (delta: number) => change({ text: Math.max(-1, Math.min(3, prefs.text + delta)) as TextStep });

  return (
    <div
      ref={root}
      className="fixed bottom-4 left-4 z-40 print:hidden md:bottom-6 md:left-6"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (open && !root.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center border border-ink bg-paper text-ink shadow-[0_6px_24px_-8px_rgba(0,0,0,0.4)] transition-colors hover:bg-ink hover:text-paper"
      >
        <AccessIcon className="h-8 w-8" />
      </button>

      <div
        ref={panel}
        id={`${uid}-panel`}
        role="dialog"
        aria-modal="false"
        aria-labelledby={`${uid}-title`}
        tabIndex={-1}
        hidden={!open}
        className="absolute bottom-full left-0 mb-3 max-h-[calc(100dvh-7rem)] w-[19rem] max-w-[calc(100vw-2rem)] overflow-y-auto border border-ink bg-paper text-ink shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between border-b border-ink/60 px-5 py-3">
          <h2 id={`${uid}-title`} className="font-serif text-lg">
            הגדרות נגישות
          </h2>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
            aria-label="סגירת תפריט הנגישות"
            className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-60"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-5 py-5 text-[0.875rem]">
          <div role="group" aria-labelledby={`${uid}-size`} className="flex flex-col gap-2">
            <span id={`${uid}-size`} className="text-ink-muted">
              גודל הטקסט
            </span>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => nextStep(-1)}
                disabled={prefs.text <= -1}
                aria-label="הקטנת הטקסט"
                className={stepButton}
              >
                <span dir="ltr" aria-hidden="true">
                  A−
                </span>
              </button>
              <output aria-live="polite" dir="ltr" className="min-w-16 text-center text-[0.9375rem]">
                {textPercent(prefs.text)}%
              </output>
              <button
                type="button"
                onClick={() => nextStep(1)}
                disabled={prefs.text >= 3}
                aria-label="הגדלת הטקסט"
                className={stepButton}
              >
                <span dir="ltr" aria-hidden="true">
                  A+
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Toggle on={prefs.contrast === "high"} onClick={() => toggleContrast("high")}>
              ניגודיות גבוהה
            </Toggle>
            <Toggle on={prefs.contrast === "dark"} onClick={() => toggleContrast("dark")}>
              רקע כהה
            </Toggle>
            <Toggle on={prefs.links} onClick={() => change({ links: !prefs.links })}>
              הדגשת קישורים
            </Toggle>
            <Toggle on={prefs.font} onClick={() => change({ font: !prefs.font })}>
              גופן קריא
            </Toggle>
            <Toggle on={prefs.spacing} onClick={() => change({ spacing: !prefs.spacing })}>
              ריווח טקסט
            </Toggle>
            <Toggle on={prefs.motion} onClick={() => change({ motion: !prefs.motion })}>
              עצירת תנועה
            </Toggle>
          </div>

          <button
            type="button"
            onClick={() => setPrefs(defaultPrefs)}
            disabled={isDefault(prefs)}
            className="flex min-h-11 items-center justify-center border border-ink/60 px-3 text-[0.8125rem] transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-40"
          >
            איפוס הגדרות
          </button>

          <p className="text-[0.78125rem] leading-[1.7] text-ink-muted">
            ההגדרות נשמרות במכשיר זה בלבד.{" "}
            <Link href="/accessibility" onClick={() => setOpen(false)} className={inlineLink}>
              הצהרת נגישות
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
