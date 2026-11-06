import type { Metadata } from "next";
import { inlineLink, LegalList, LegalPage, LegalSection } from "@/components/LegalPage";
import { business } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "תנאי השימוש באתר Soil by Aviv Sulimani.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage label="תנאים" title="תנאי שימוש" updated="6 בנובמבר 2026">
      <LegalSection heading="כללי">
        <p>
          האתר Soil by Aviv Sulimani מופעל על ידי {business.legalNameHe}, עסק של אביב סולימני, ומציג את
          העסק ואת שירותיו. השימוש בו מהווה הסכמה לתנאים אלה. אם אינכם מסכימים להם, אל תשתמשו באתר.
        </p>
      </LegalSection>

      <LegalSection heading="המידע באתר">
        <LegalList
          items={[
            "המידע באתר הוא מידע כללי, והוא אינו מהווה הצעה מחייבת. תפריטים, מחירים, זמינות ותנאי ההזמנה והביטול נקבעים ומאושרים מול הלקוח, ומפורטים בהצעת המחיר שנשלחת אליו.",
            "אנו משתדלים שהמידע באתר יהיה מדויק ועדכני, אך ייתכנו טעויות או שינויים, והאתר מסופק כפי שהוא (AS IS), ללא התחייבות לפעילות רציפה ושאינה מופרעת.",
            "ההמלצות באתר הן של לקוחות, ומתפרסמות בהסכמתם.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="קניין רוחני">
        <p>
          הטקסטים, התמונות, הסרטונים, הלוגו והעיצוב של האתר שייכים ל{business.legalNameHe} (Soil by Aviv
          Sulimani) או לבעלי הזכויות בהם, ואסור להעתיק, להפיץ, לשכפל או לעשות בהם שימוש מסחרי ללא אישור בכתב ומראש. מותר לשתף קישור
          לאתר.
        </p>
      </LegalSection>

      <LegalSection heading="קישורים לאתרים אחרים">
        <p>
          האתר כולל קישורים לשירותים של צדדים שלישיים (וואטסאפ, אינסטגרם, פייסבוק, Waze וגוגל). אין לנו
          שליטה בהם, ואיננו אחראים לתוכנם או למדיניות הפרטיות שלהם.
        </p>
      </LegalSection>

      <LegalSection heading="זכויות צרכנים">
        <p>
          האמור באתר אינו פוגע בזכויות המוקנות לצרכן על פי דין, לרבות לפי חוק הגנת הצרכן, התשמ״א-1981,
          ובכלל זה הזכות לבטל עסקה כפי שהיא קבועה בחוק.
        </p>
      </LegalSection>

      <LegalSection heading="פרטיות ונגישות">
        <p>
          האופן שבו אנו מטפלים במידע אישי מפורט ב
          <Link href="/privacy" className={inlineLink}>
            מדיניות הפרטיות
          </Link>
          , והתאמות הנגישות באתר מפורטות ב
          <Link href="/accessibility" className={inlineLink}>
            הצהרת הנגישות
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="הדין החל">
        <p>על השימוש באתר ועל תנאים אלה יחול הדין הישראלי.</p>
      </LegalSection>

      <LegalSection heading="פנייה אלינו">
        <p>
          לשאלות על התנאים אפשר לפנות בטלפון{" "}
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
    </LegalPage>
  );
}
