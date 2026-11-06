// Class strings shared between server and client components.

export const boxButton =
  "inline-flex min-h-12 items-center justify-center border border-ink px-6 py-2 text-[0.78125rem] tracking-[1.2px] transition-colors hover:bg-ink hover:text-paper md:px-[30px] md:text-[0.8125rem] md:tracking-[1.4px]";

/**
 * The solid call to action. The brand teal is too light to carry white text (2.4:1), so the button uses the
 * deeper accent-ink (5.2:1).
 */
export const flatButton =
  "inline-flex min-h-12 items-center justify-center bg-accent-ink px-6 py-2 text-[0.78125rem] tracking-[1.2px] text-on-accent transition-colors hover:bg-ink hover:text-paper md:px-[34px] md:text-[0.8125rem] md:tracking-[1.4px]";

export const eyebrow =
  "text-[0.65625rem] tracking-[2.4px] text-ink-faint md:text-[0.6875rem] md:tracking-[2.6px]";

export const textLink =
  "border-b border-ink/60 pb-1 text-[0.71875rem] tracking-[1.4px] transition-colors hover:border-accent-ink hover:text-accent-ink md:text-xs md:tracking-[1.6px]";

/** An inline link inside running text. */
export const inlineLink =
  "border-b border-ink/60 text-ink transition-colors hover:border-accent-ink hover:text-accent-ink";
