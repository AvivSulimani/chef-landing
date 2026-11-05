import Link from "next/link";
import { Footer } from "./Sections";
import { eyebrow, textLink } from "./styles";

/** An inline link inside running text. */
export const inlineLink =
  "border-b border-ink/30 text-ink transition-colors hover:border-accent hover:text-accent";

/** The frame of a plain text page (accessibility statement, privacy policy): header, article, footer. */
export function LegalPage({
  label,
  title,
  updated,
  children,
}: {
  label: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
        <Link
          href="/"
          aria-label="Soil, חזרה לדף הבית"
          className="ps-[5px] font-serif text-[15px] tracking-[5px] md:ps-[7px] md:text-[19px] md:tracking-[7px]"
        >
          SOIL
        </Link>
        <Link href="/" className={textLink}>
          חזרה לאתר
        </Link>
      </header>

      <main className="flex-1 px-6 pb-16 pt-6 md:px-14 md:pb-[124px] md:pt-14">
        <article className="mx-auto flex max-w-[720px] flex-col gap-9 md:gap-12">
          <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
            <span className={eyebrow}>{label}</span>
            <h1 className="text-center font-serif text-2xl md:text-[32px]">{title}</h1>
          </div>
          <div className="flex flex-col gap-9 md:gap-11">{children}</div>
          <p className="text-[12.5px] text-ink-muted">עודכן לאחרונה: {updated}</p>
        </article>
      </main>

      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="font-serif text-xl md:text-[24px]">{heading}</h2>
      <div className="flex flex-col gap-4 text-[15px] font-light leading-[1.95] text-ink-muted md:text-[16.5px] md:leading-[2]">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-3 ps-5 marker:text-ink-faint">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
