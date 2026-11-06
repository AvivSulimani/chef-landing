import Link from "next/link";
import { boxButton, eyebrow } from "@/components/styles";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className={eyebrow}>404</span>
      <h1 className="font-serif text-2xl md:text-[2rem]">הדף לא נמצא</h1>
      <p className="max-w-[420px] text-[0.9375rem] font-light leading-[1.9] text-ink-muted md:text-[1.03125rem]">
        הכתובת שחיפשתם לא קיימת, או שהדף עבר למקום אחר.
      </p>
      <Link href="/" className={boxButton}>
        חזרה לאתר
      </Link>
    </main>
  );
}
