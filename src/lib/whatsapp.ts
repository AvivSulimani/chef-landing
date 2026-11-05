import { business } from "./content";

export type ContactFields = {
  name: string;
  tel: string;
  text: string;
};

/**
 * WhatsApp's click-to-chat link only reads `phone` and `text`; any other form
 * field is dropped. So the visitor's name and number have to be folded into the
 * message itself.
 */
export function composeWhatsappMessage({ name, tel, text }: ContactFields): string {
  const who = name.trim();
  const message = text.trim();
  const callback = tel.trim();

  const lines = [who ? `היי ${business.ownerFirstHe}, כאן ${who}.` : `היי ${business.ownerFirstHe},`];
  if (message) lines.push(message);
  if (callback) lines.push(`טלפון לחזרה: ${callback}`);
  return lines.join("\n");
}

/** Click-to-chat link for the business number, optionally pre-filled. */
export function whatsappUrl(text?: string): string {
  // `business.whatsapp` already carries `?phone=…`
  return text ? `${business.whatsapp}&text=${encodeURIComponent(text)}` : business.whatsapp;
}
