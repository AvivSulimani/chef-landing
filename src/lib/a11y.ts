import { useSyncExternalStore } from "react";
import { A11Y_KEY } from "./a11y-boot";

/**
 * The visitor's accessibility choices, shared by the accessibility menu and by the parts of the page that move
 * (the clips and the reviews slider). They live in this browser only (localStorage, wrapped in try/catch because
 * storage can be blocked) and are written onto <html> as data-a11y-* attributes, which globals.css reacts to.
 * Client side only: import it from client components, never from the root layout.
 */

export type TextStep = -1 | 0 | 1 | 2 | 3;
export type Contrast = "off" | "high" | "dark";

export type A11yPrefs = {
  /** Text size step: -1 is 90%, 0 is 100%, then 115%, 130% and 150%. */
  text: TextStep;
  contrast: Contrast;
  /** Underline every link. */
  links: boolean;
  /** Use one plain typeface instead of the serif display face. */
  font: boolean;
  /** More space between lines, words and letters. */
  spacing: boolean;
  /** Stop the clips, the slider's autoplay and every animation. */
  motion: boolean;
};

export const defaultPrefs: A11yPrefs = { text: 0, contrast: "off", links: false, font: false, spacing: false, motion: false };

const PERCENT: Record<TextStep, number> = { [-1]: 90, 0: 100, 1: 115, 2: 130, 3: 150 };
export const textPercent = (step: TextStep): number => PERCENT[step];

export function isDefault(p: A11yPrefs): boolean {
  return (Object.keys(defaultPrefs) as (keyof A11yPrefs)[]).every((k) => p[k] === defaultPrefs[k]);
}

function sanitize(raw: unknown): A11yPrefs {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    text: ([-1, 1, 2, 3] as unknown[]).includes(r.text) ? (r.text as TextStep) : 0,
    contrast: r.contrast === "high" || r.contrast === "dark" ? r.contrast : "off",
    links: r.links === true,
    font: r.font === true,
    spacing: r.spacing === true,
    motion: r.motion === true,
  };
}

function read(): A11yPrefs {
  try {
    const stored = localStorage.getItem(A11Y_KEY);
    return stored ? sanitize(JSON.parse(stored)) : defaultPrefs;
  } catch {
    return defaultPrefs;
  }
}

/** Mirrors the choices onto <html>; the styles in globals.css do the rest. */
export function applyToDocument(p: A11yPrefs): void {
  const root = document.documentElement;
  const set = (name: string, value: string | null) =>
    value === null ? root.removeAttribute(name) : root.setAttribute(name, value);
  set("data-a11y-text", p.text === 0 ? null : String(p.text));
  set("data-a11y-contrast", p.contrast === "off" ? null : p.contrast);
  set("data-a11y-links", p.links ? "on" : null);
  set("data-a11y-font", p.font ? "readable" : null);
  set("data-a11y-spacing", p.spacing ? "on" : null);
  set("data-a11y-motion", p.motion ? "off" : null);
}

let current: A11yPrefs = defaultPrefs;
let loaded = false;
const listeners = new Set<() => void>();

function load(): A11yPrefs {
  if (!loaded && typeof window !== "undefined") {
    current = read();
    loaded = true;
  }
  return current;
}

/** Puts the saved choices on <html> (a no-op when the script in <head> already did). */
export function syncDocument(): void {
  applyToDocument(load());
}

export function setPrefs(next: A11yPrefs): void {
  current = next;
  loaded = true;
  try {
    if (isDefault(next)) localStorage.removeItem(A11Y_KEY);
    else localStorage.setItem(A11Y_KEY, JSON.stringify(next));
  } catch {
    // storage is blocked: the choice still holds for this visit
  }
  applyToDocument(next);
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void): () => void {
  listeners.add(notify);
  // another tab changed the choices
  const onStorage = (e: StorageEvent) => {
    if (e.key !== A11Y_KEY) return;
    current = read();
    applyToDocument(current);
    notify();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

export function useA11yPrefs(): A11yPrefs {
  return useSyncExternalStore(subscribe, load, () => defaultPrefs);
}

const REDUCE = "(prefers-reduced-motion: reduce)";

/** True when animation is welcome: the system did not ask for less motion and the visitor did not stop it. */
export function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return !load().motion && !window.matchMedia(REDUCE).matches;
}

/** The same, as a hook that updates when either of the two switches changes. */
export function useMotionAllowed(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(REDUCE);
      media.addEventListener("change", notify);
      const unsubscribe = subscribe(notify);
      return () => {
        media.removeEventListener("change", notify);
        unsubscribe();
      };
    },
    motionAllowed,
    () => false,
  );
}
