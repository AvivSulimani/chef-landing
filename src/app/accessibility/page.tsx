import type { Metadata } from "next";
import { inlineLink, LegalList, LegalPage, LegalSection } from "@/components/LegalPage";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת הנגישות של האתר Soil by Aviv Sulimani: מה נעשה, מה עוד חסר ואיך אפשר לפנות אלינו.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage label="נגישות" title="הצהרת נגישות" updated="6 בנובמבר 2026">
      <LegalSection heading="המחויבות שלנו">
        <p>
          Soil by Aviv Sulimani רואה חשיבות בכך שהאתר יהיה נגיש ונוח לשימוש לכל אדם, ובכלל זה
          אנשים עם מוגבלות, ופועלת לשפר את חוויית השימוש בו.
        </p>
      </LegalSection>

      <LegalSection heading="מה נעשה באתר">
        <LegalList
          items={[
            "האתר כתוב בעברית, בכיווניות מימין לשמאל, ושפת הדף מוגדרת בקוד.",
            "מבנה הדפים כולל כותרות היררכיות ואזורים מוגדרים (ראש העמוד, התוכן הראשי, תפריט ניווט ותחתית), כדי להקל על הניווט בקורא מסך.",
            "אפשר להפעיל במקלדת את התפריט, את לשוניות הגלריה, את מציג התמונות במסך מלא (חיצים לדפדוף ומקש Esc לסגירה) ואת קרוסלת ההמלצות.",
            "לתמונות הגלריה ולצילומי ההמלצות יש תיאור טקסטואלי לקוראי מסך, ולכל המלצה מופיע גם ציטוט כתוב.",
            "למי שהגדיר במכשיר העדפה להפחתת תנועה: הסרטונים בגלריה אינם מתנגנים מעצמם, והמעבר האוטומטי בין ההמלצות מושבת.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="מגבלות ידועות">
        <LegalList
          items={[
            "לא נערכה עד כה בדיקת נגישות מקצועית לאתר, ולכן ייתכן שיש בו חלקים שאינם נגישים באופן מלא.",
            "חלק מהטקסטים הקטנים מוצגים בגוון אפור בהיר, וייתכן שהניגודיות שלהם נמוכה.",
            "הסרטונים בגלריה אינם כוללים קול, ולכן גם לא כתוביות.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="פניות בנושא נגישות">
        <p>
          נתקלתם בקושי, או שיש לכם הצעה לשיפור? נשמח לשמוע ולטפל בכך בהקדם. רכז הנגישות הוא
          אביב סולימני.
        </p>
        <p>
          טלפון:{" "}
          <a href={business.phoneHref} className={inlineLink}>
            <span dir="ltr" className="whitespace-nowrap">
              {business.phone}
            </span>
          </a>
          {" · "}
          וואטסאפ:{" "}
          <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className={inlineLink}>
            שליחת הודעה
          </a>
          {" · "}
          דוא״ל:{" "}
          <a href={`mailto:${business.email}`} className={inlineLink}>
            <span dir="ltr" className="whitespace-nowrap">
              {business.email}
            </span>
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
