"use client";

import { useState } from "react";
import { business } from "@/lib/content";
import { composeWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";
import { boxButton, flatButton } from "./styles";

const field =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0.5 py-3 text-[15px] font-light text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

/**
 * Collects name, phone and a message, then opens WhatsApp with all three in one
 * pre-filled message (WhatsApp ignores any field other than `phone` and `text`).
 *
 * Without JavaScript the form still submits natively to WhatsApp; only the
 * message field reaches the chat in that case.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [text, setText] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = whatsappUrl(composeWhatsappMessage({ name, tel, text }));
    // window.open with "noopener" always returns null, so the opener is cleared
    // by hand; a blocked popup falls back to navigating this tab.
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(url);
    }
  }

  return (
    <form
      action="https://api.whatsapp.com/send"
      method="get"
      target="_blank"
      onSubmit={onSubmit}
      className="mt-2 flex w-full flex-col gap-4 md:gap-5"
    >
      <input type="hidden" name="phone" value={business.whatsappNumber} />
      <input
        className={field}
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="שם מלא"
        aria-label="שם מלא"
        autoComplete="name"
      />
      <input
        className={field}
        type="tel"
        name="tel"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        placeholder="מספר טלפון"
        aria-label="מספר טלפון"
        autoComplete="tel"
      />
      <textarea
        className={`${field} resize-none`}
        name="text"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ספרו לנו על האירוע – תאריך, מספר סועדים ומקום"
        aria-label="הודעה"
      />
      <div className="mt-2 flex flex-col gap-2.5 md:flex-row md:gap-3.5">
        <button type="submit" className={flatButton}>
          שליחה בוואטסאפ
        </button>
        <a href={business.phoneHref} className={boxButton}>
          חייגו עכשיו
        </a>
      </div>
    </form>
  );
}
