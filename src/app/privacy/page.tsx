import type { Metadata } from "next";
import { inlineLink, LegalPage, LegalSection } from "@/components/LegalPage";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של האתר Soil by Aviv Sulimani: איזה מידע נאסף, ואיך פונים אלינו.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage label="פרטיות" title="מדיניות פרטיות" updated="6 בנובמבר 2026">
      <LegalSection heading="בקצרה">
        <p>
          האתר אינו אוסף פרטים אישיים באופן אוטומטי. אין בו הרשמה, אין עוגיות (cookies) לצורכי
          מעקב או פרסום, ואין כלי סטטיסטיקה או פיקסלים של רשתות חברתיות.
        </p>
      </LegalSection>

      <LegalSection heading="יצירת קשר">
        <p>
          הטופס באתר אינו שולח מידע לשרת שלנו. הוא מכין הודעה בדפדפן שלכם ופותח את WhatsApp,
          וההודעה נשלחת רק אם תלחצו בעצמכם על שליחה. מרגע השליחה היא עוברת דרך WhatsApp, בהתאם
          לתנאי השירות ולמדיניות הפרטיות שלו. השם, מספר הטלפון ותוכן ההודעה ישמשו אותנו כדי
          לחזור אליכם בנוגע לפנייה.
        </p>
      </LegalSection>

      <LegalSection heading="אירוח ונתונים טכניים">
        <p>
          האתר מתארח אצל Vercel. כמו בכל אתר, שרתי האירוח עשויים לתעד נתונים טכניים בסיסיים על
          כל ביקור, כגון כתובת IP, סוג הדפדפן ושעת הגישה, לצורכי אבטחה ותפעול תקין. הגופנים,
          התמונות והסרטונים נטענים מהאתר עצמו.
        </p>
      </LegalSection>

      <LegalSection heading="קישורים לאתרים אחרים">
        <p>
          באתר יש קישורים אל אינסטגרם, פייסבוק, וואטסאפ, Waze וגוגל (לביקורות). לאחר לחיצה על
          קישור כזה חלה מדיניות הפרטיות של אותו שירות.
        </p>
      </LegalSection>

      <LegalSection heading="פנייה אלינו">
        <p>
          מי שמסר לנו פרטים ומבקש לעיין בהם, לתקן אותם או למחוק אותם, מוזמן לפנות אלינו בכל עת:
          בטלפון{" "}
          <a href={business.phoneHref} className={inlineLink}>
            <span dir="ltr" className="whitespace-nowrap">
              {business.phone}
            </span>
          </a>{" "}
          או בדוא״ל{" "}
          <a href={`mailto:${business.email}`} className={inlineLink}>
            <span dir="ltr" className="whitespace-nowrap">
              {business.email}
            </span>
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="עדכונים">
        <p>אם יתווספו לאתר כלי מדידה או שירותים חדשים, נעדכן את המדיניות לפני כן.</p>
      </LegalSection>
    </LegalPage>
  );
}
