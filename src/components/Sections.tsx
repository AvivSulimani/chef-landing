import Image, { getImageProps } from "next/image";
import {
  business,
  reviewCards,
  services,
  story,
  type ReviewCard,
} from "@/lib/content";
import { ReviewsCarousel } from "./ReviewsCarousel";
import {
  FacebookIcon,
  InstagramIcon,
  ServiceIcon,
  WhatsappIcon,
} from "./icons";

const eyebrow = "text-[10.5px] tracking-[2.4px] text-ink-faint md:text-[11px] md:tracking-[2.6px]";
const textLink =
  "border-b border-ink/30 pb-1 text-[11.5px] tracking-[1.4px] transition-colors hover:border-accent hover:text-accent md:text-xs md:tracking-[1.6px]";
const boxButton =
  "inline-flex h-12 items-center justify-center border border-ink px-6 text-[12.5px] tracking-[1.2px] transition-colors hover:bg-ink hover:text-paper md:px-[30px] md:text-[13px] md:tracking-[1.4px]";
const flatButton =
  "inline-flex h-12 items-center justify-center bg-accent px-6 text-[12.5px] tracking-[1.2px] text-white transition-opacity hover:opacity-85 md:px-[34px] md:text-[13px] md:tracking-[1.4px]";

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
      <div className="absolute inset-0 bg-[#141210]/34" />
      <h1 className="relative z-10 ps-[15px] font-serif text-[46px] font-light tracking-[15px] text-white md:ps-[38px] md:text-[118px] md:tracking-[38px]">
        SOIL
      </h1>
    </section>
  );
}

export function Statement() {
  return (
    <section className="flex justify-center px-6 py-16 md:px-14 md:py-[124px]">
      <p className="max-w-[780px] text-center text-base leading-[1.85] tracking-[0.8px] md:text-[21px] md:tracking-[1.5px]">
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
          <h2 className="text-center font-serif text-2xl md:text-[32px]">{story.heading}</h2>
        </div>
        <div className="flex flex-col gap-[18px] text-[15px] font-light leading-[1.95] text-ink-muted md:gap-6 md:text-[16.5px] md:leading-[2.05]">
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
      <h2 className="mb-11 text-center font-serif text-[22px] tracking-[3.5px] md:mb-[78px] md:text-[30px] md:tracking-[5px]">
        השירותים שלנו
      </h2>
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 justify-items-center gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-[62px]">
        {services.map((service, i) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className={`flex flex-col items-center gap-3.5 text-center transition-colors hover:text-accent md:gap-5 ${
              i === services.length - 1 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <ServiceIcon id={service.id} className="h-16 w-16 md:h-[88px] md:w-[88px]" />
            <span className="text-[11.5px] tracking-[2px] md:text-xs md:tracking-[2.4px]">
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
                <span className={eyebrow}>{service.eyebrow}</span>
                <h3 className="font-serif text-[21px] md:text-[28px]">{service.title}</h3>
              </div>
              <p className="text-[15px] font-light leading-[1.9] text-ink-muted md:text-[16.5px] md:leading-[2]">
                {service.body}
              </p>
              <div className="mt-1 flex items-center gap-[18px] md:gap-[26px]">
                <a href="#contact" className={textLink}>
                  פרטים נוספים
                </a>
                <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className={boxButton}>
                  {service.cta}
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
function ReviewPicture({ review }: { review: ReviewCard }) {
  const common = { alt: review.alt, quality: 90 };
  const desktop = getImageProps({
    ...common,
    ...review.desktop,
    sizes: "640px",
  });
  const mobile = getImageProps({
    ...common,
    ...(review.mobile ?? review.desktop),
    sizes: "(max-width: 767px) 86vw, 640px",
  });

  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={desktop.props.srcSet}
        sizes={desktop.props.sizes}
      />
      <img {...mobile.props} alt={review.alt} className="block h-auto w-full" />
    </picture>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-paper-warm px-6 py-16 md:px-14 md:py-[124px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:gap-[52px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>המלצות מלקוחות</span>
          <h2 className="font-serif text-2xl md:text-[32px]">מה אומרים עלינו</h2>
        </div>

        <ReviewsCarousel>
          {reviewCards.map((review) => (
            <figure
              key={review.id}
              className="w-[86vw] max-w-[640px] shrink-0 snap-start overflow-hidden border border-rule bg-white md:w-[640px]"
            >
              <ReviewPicture review={review} />
              <figcaption className="sr-only">
                {review.source} · {review.author}: {review.transcript}
              </figcaption>
            </figure>
          ))}
        </ReviewsCarousel>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="flex justify-center px-6 py-16 md:px-14 md:py-[124px]">
      <div className="flex w-full max-w-[540px] flex-col items-center gap-5 md:gap-[26px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>רוצים לקבוע ארוחה?</span>
          <h2 className="font-serif text-2xl md:text-[32px]">צרו קשר</h2>
        </div>
        <a
          href={business.phoneHref}
          className="text-[22px] font-extralight tracking-[1.5px] transition-colors hover:text-accent md:text-[26px] md:tracking-[2px]"
        >
          {business.phone}
        </a>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const field =
    "w-full border-0 border-b border-ink/30 bg-transparent px-0.5 py-3 text-[15px] font-light text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

  return (
    <form
      action={business.whatsapp}
      method="get"
      target="_blank"
      className="mt-2 flex w-full flex-col gap-4 md:gap-5"
    >
      <input type="hidden" name="phone" value="972542253132" />
      <input className={field} type="text" name="name" placeholder="שם מלא" autoComplete="name" />
      <input className={field} type="tel" name="tel" placeholder="מספר טלפון" autoComplete="tel" />
      <textarea
        className={`${field} resize-none`}
        name="text"
        rows={2}
        placeholder="ספרו לנו על האירוע – תאריך, מספר סועדים ומקום"
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
          <span className="font-serif text-[15px] tracking-[5px] md:text-[17px] md:tracking-[6px]">
            SOIL
          </span>
          <span className={eyebrow}>BY AVIV SULIMANI</span>
        </div>

        <div className="hidden flex-col gap-4 md:flex">
          <span className={eyebrow}>מה אנחנו עושים</span>
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-[15px] transition-colors hover:text-accent">
              {s.shortLabel}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <span className={eyebrow}>צרו קשר</span>
          <a href={business.phoneHref} className="text-sm transition-colors hover:text-accent md:text-[15px]">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="text-sm transition-colors hover:text-accent md:text-[15px]">
            {business.email}
          </a>
          <a
            href={business.waze}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-accent md:text-[15px]"
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
                className="transition-colors hover:text-accent"
              >
                <Icon className="h-[34px] w-[34px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[1180px] border-t border-rule pt-5 md:mt-0 md:pt-6">
        <span className="text-[10.5px] tracking-[1.2px] text-ink-faint md:text-[11px] md:tracking-[1.4px]">
          © {new Date().getFullYear()} SOIL BY AVIV SULIMANI · כל הזכויות שמורות
        </span>
      </div>
    </footer>
  );
}
