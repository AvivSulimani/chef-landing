import Image from "next/image";
import Link from "next/link";
import {
  business,
  services,
  story,
} from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { boxButton, eyebrow, textLink } from "./styles";

/** An English phrase on a Hebrew page: it gets lang="en" so that screen readers pronounce it properly. */
const latinOnly = /^[\x20-\x7E]+$/;
import {
  FacebookIcon,
  InstagramIcon,
  ServiceIcon,
  WhatsappIcon,
} from "./icons";


export function Hero() {
  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden md:h-[760px]">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#141210]/38" />
      {/* A darker band behind the header keeps its small white text above 4.5:1 on every screen size. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#141210]/55 to-transparent" />
      <h1 className="relative z-10 ps-[15px] font-serif text-[2.875rem] font-light tracking-[15px] text-white md:ps-[38px] md:text-[7.375rem] md:tracking-[38px]">
        SOIL
      </h1>
    </section>
  );
}

export function Statement() {
  return (
    <section className="flex justify-center px-6 py-16 md:px-14 md:py-[124px]">
      <p className="max-w-[780px] text-center text-base leading-[1.85] tracking-[0.8px] md:text-[1.3125rem] md:tracking-[1.5px]">
        {business.tagline}
      </p>
    </section>
  );
}

export function Story() {
  return (
    <section id="about" className="flex justify-center px-6 pb-16 md:px-14 md:pb-[124px]">
      <div className="flex max-w-[720px] flex-col gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>{story.eyebrow}</span>
          <h2 className="text-center font-serif text-2xl md:text-[2rem]">{story.heading}</h2>
        </div>
        <div className="flex flex-col gap-[18px] text-[0.9375rem] font-light leading-[1.95] text-ink-muted md:gap-6 md:text-[1.03125rem] md:leading-[2.05]">
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FullBleed({
  src,
  alt = "",
  position,
  className,
}: {
  src: string;
  alt?: string;
  position?: string;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${className ?? "h-[420px] md:h-[620px]"}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </section>
  );
}

export function ServicesIndex() {
  return (
    <section id="services" className="px-6 pb-14 pt-16 md:px-14 md:pb-[108px] md:pt-[124px]">
      <h2 className="mb-11 text-center font-serif text-[1.375rem] tracking-[3.5px] md:mb-[78px] md:text-[1.875rem] md:tracking-[5px]">
        השירותים שלנו
      </h2>
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 justify-items-center gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-[62px]">
        {services.map((service, i) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className={`flex flex-col items-center gap-3.5 text-center transition-colors hover:text-accent-ink md:gap-5 ${
              i === services.length - 1 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <ServiceIcon id={service.id} className="h-16 w-16 md:h-[88px] md:w-[88px]" />
            <span className="text-[0.71875rem] tracking-[2px] md:text-xs md:tracking-[2.4px]">
              {service.shortLabel}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ServiceSections() {
  return (
    <>
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`px-6 md:px-14 ${
            i === services.length - 1 ? "pb-16 md:pb-[124px]" : "pb-16 md:pb-[104px]"
          }`}
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-5 md:gap-[34px]">
            <div className="relative h-[230px] w-full overflow-hidden md:h-[430px]">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1180px"
                className="object-cover"
                style={
                  service.imagePosition
                    ? { objectPosition: service.imagePosition }
                    : undefined
                }
              />
            </div>
            <div className="flex max-w-[700px] flex-col gap-5">
              <div className="flex flex-col gap-1.5 md:gap-2">
                <span className={eyebrow} lang={latinOnly.test(service.eyebrow) ? "en" : undefined}>
                  {service.eyebrow}
                </span>
                <h3 className="font-serif text-[1.3125rem] md:text-[1.75rem]">{service.title}</h3>
              </div>
              <p className="text-[0.9375rem] font-light leading-[1.9] text-ink-muted md:text-[1.03125rem] md:leading-[2]">
                {service.body}
              </p>
              <div className="mt-1 flex items-center gap-[18px] md:gap-[26px]">
                <a href="#contact" className={textLink}>
                  פרטים נוספים<span className="sr-only"> על {service.title}</span>
                </a>
                <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className={boxButton}>
                  {service.cta}
                  <span className="sr-only"> – {service.title}, נפתח בלשונית חדשה</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * One review screenshot with art direction: phone-sized image below `md`,
 * desktop-sized image above. Falls back to the desktop file until a phone
 * screenshot exists.
 */
export function Contact() {
  return (
    <section id="contact" className="flex justify-center px-6 py-16 md:px-14 md:py-[124px]">
      <div className="flex w-full max-w-[540px] flex-col items-center gap-5 md:gap-[26px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>רוצים לקבוע ארוחה?</span>
          <h2 className="font-serif text-2xl md:text-[2rem]">צרו קשר</h2>
        </div>
        <a
          href={business.phoneHref}
          className="text-[1.375rem] font-extralight tracking-[1.5px] transition-colors hover:text-accent-ink md:text-[1.625rem] md:tracking-[2px]"
        >
          {business.phone}
        </a>
        <ContactForm />
      </div>
    </section>
  );
}

export function Footer() {
  const social = [
    { href: business.instagram, label: "אינסטגרם", Icon: InstagramIcon },
    { href: business.facebook, label: "פייסבוק", Icon: FacebookIcon },
    { href: business.whatsapp, label: "וואטסאפ", Icon: WhatsappIcon },
  ];

  return (
    <footer className="border-t border-rule px-6 pb-7 pt-10 md:px-14 md:pb-8 md:pt-[66px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-7 pb-0 md:grid md:grid-cols-[1.3fr_1fr_1fr] md:gap-14 md:pb-[46px]">
        <div className="flex flex-col gap-2 md:gap-3.5">
          <span className="font-serif text-[0.9375rem] tracking-[5px] md:text-[1.0625rem] md:tracking-[6px]">
            SOIL
          </span>
          <span className={eyebrow} lang="en">
            BY AVIV SULIMANI
          </span>
        </div>

        <div className="hidden flex-col gap-4 md:flex">
          <span className={eyebrow}>מה אנחנו עושים</span>
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-[0.9375rem] transition-colors hover:text-accent-ink">
              {s.shortLabel}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <span className={eyebrow}>צרו קשר</span>
          <a href={business.phoneHref} className="text-sm transition-colors hover:text-accent-ink md:text-[0.9375rem]">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="text-sm transition-colors hover:text-accent-ink md:text-[0.9375rem]">
            {business.email}
          </a>
          <a
            href={business.waze}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-accent-ink md:text-[0.9375rem]"
          >
            {business.location}
          </a>
          <div className="mt-1.5 flex gap-3.5">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors hover:text-accent-ink"
              >
                <Icon className="h-[34px] w-[34px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* pl-[4.5rem] keeps the links clear of the floating accessibility button in the bottom-left corner */}
      <div className="mx-auto mt-7 flex max-w-[1180px] flex-col gap-3.5 border-t border-rule pl-[4.5rem] pt-5 md:mt-0 md:flex-row md:items-center md:justify-between md:pt-6">
        <span className="text-[0.65625rem] tracking-[1.2px] text-ink-faint md:text-[0.6875rem] md:tracking-[1.4px]">
          © {new Date().getFullYear()} {business.legalNameHe} · SOIL BY AVIV SULIMANI
          {/* on a phone "all rights reserved" gets its own line, so no separator dot is left hanging at a line end */}
          <span aria-hidden className="hidden md:inline">
            {" "}
            ·{" "}
          </span>
          <span className="block md:inline">כל הזכויות שמורות</span>
        </span>
        <nav aria-label="מידע משפטי" className="flex flex-wrap gap-x-5 gap-y-2 text-[0.71875rem] tracking-[1px] text-ink-muted md:text-xs">
          <Link href="/accessibility" className="transition-colors hover:text-accent-ink">
            הצהרת נגישות
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-accent-ink">
            מדיניות פרטיות
          </Link>
          <Link href="/terms" className="transition-colors hover:text-accent-ink">
            תנאי שימוש
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export { GallerySection as Gallery } from "./gallery/GallerySection";
export { ReviewsSection as Reviews } from "./reviews/ReviewsSection";
