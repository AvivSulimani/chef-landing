"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { business } from "@/lib/content";
import { composeWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";
import { boxButton, flatButton, inlineLink } from "./styles";

// The bottom rule is the only outline of a field, so it is dark enough to be seen (3.8:1, WCAG 1.4.11).
const field =
  "w-full border-0 border-b border-ink/60 bg-transparent px-0.5 py-3 text-[0.9375rem] font-light text-ink transition-colors focus:border-ink";

const label = "text-[0.8125rem] tracking-[0.4px] text-ink-muted";

/**
 * Collects name, phone and a message, then opens WhatsApp with all three in one
 * pre-filled message (WhatsApp ignores any field other than `phone` and `text`).
 *
 * Without JavaScript the form still submits natively to WhatsApp; only the
 * message field reaches the chat in that case.
 *
 * Every field has a visible label, and the short notice under the buttons is the one the Protection of Privacy
 * Law (section 11) asks for whenever personal details are requested: voluntary or not, the purpose, who gets
 * them, the controller, and the right to inspect and correct. The full text is in the privacy policy.
 */
export function ContactForm() {
  const uid = useId();
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
      className="mt-2 flex w-full flex-col gap-5 md:gap-6"
    >
      <input type="hidden" name="phone" value={business.whatsappNumber} />

      <div className="flex flex-col">
        <label htmlFor={`${uid}-name`} className={label}>
          שם מלא
        </label>
        <input
          id={`${uid}-name`}
          className={field}
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor={`${uid}-tel`} className={label}>
          מספר טלפון
        </label>
        <input
          id={`${uid}-tel`}
          className={field}
          type="tel"
          name="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor={`${uid}-text`} className={label}>
          הודעה
        </label>
        <span id={`${uid}-hint`} className="text-[0.78125rem] text-ink-faint">
          ספרו לנו על האירוע – תאריך, מספר סועדים ומקום
        </span>
        <textarea
          id={`${uid}-text`}
          className={`${field} resize-none`}
          name="text"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-describedby={`${uid}-hint`}
        />
      </div>

      <div className="mt-1 flex flex-col gap-2.5 md:flex-row md:gap-3.5">
        <button type="submit" className={flatButton}>
          שליחה בוואטסאפ
        </button>
        <a href={business.phoneHref} className={boxButton}>
          חייגו עכשיו
        </a>
      </div>

      <p className="text-[0.78125rem] leading-[1.8] text-ink-muted">
        מסירת הפרטים אינה חובה על פי חוק ותלויה ברצונכם; ללא מסירתם לא נוכל לחזור אליכם בנוגע לפנייה, ואפשר גם
        להתקשר. הפרטים יישמרו אצל {business.legalNameHe} (Soil) בבעלות אביב סולימני, ישמשו רק כדי לחזור אליכם ולתאם את האירוע, ולא יימסרו
        לאחרים; ההודעה עוברת דרך WhatsApp. לעיון בפרטים, לתיקונם ולמחיקתם:{" "}
        <Link href="/privacy#rights" className={inlineLink}>
          מדיניות הפרטיות
        </Link>
        .
      </p>
    </form>
  );
}
