"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ReviewCard } from "@/lib/content";
import { Close } from "../icons";

/**
 * A button (or any content) that opens the original screenshot of a review in
 * a modal. Uses the native <dialog>: Esc closes it, focus is trapped and
 * restored by the browser, and a click on the backdrop closes it.
 */
export function OriginalReview({
  review,
  className,
  children,
  label,
}: {
  review: ReviewCard;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={className}
        aria-label={label}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      <dialog
        ref={dialog}
        aria-label={`הביקורת המקורית של ${review.author}`}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[94vh] max-w-[94vw] overflow-auto border-0 bg-transparent p-0 backdrop:bg-ink/70"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="סגירה"
            className="absolute start-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-white/90 text-ink shadow transition-colors hover:bg-ink hover:text-paper"
          >
            <Close className="h-4 w-4" />
          </button>
          <Image
            src={review.image.src}
            alt={`${review.alt}: ${review.transcript}`}
            width={review.image.width}
            height={review.image.height}
            sizes="(max-width: 640px) 94vw, 620px"
            quality={90}
            className="block h-auto w-[min(94vw,620px)] bg-white"
          />
        </div>
      </dialog>
    </>
  );
}
