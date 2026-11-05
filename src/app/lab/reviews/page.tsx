import type { Metadata } from "next";
import { ReviewsSection, type ReviewsVariant } from "@/components/reviews/ReviewsSection";

// Temporary comparison page for choosing the reviews layout. Not linked, not indexed.
export const metadata: Metadata = {
  title: "Soil · reviews layouts",
  robots: { index: false, follow: false },
};

const options: { variant: ReviewsVariant; title: string; note: string }[] = [
  {
    variant: "quote",
    title: "אפשרות 1 · ציטוט עורכי",
    note: "ציטוט גדול אחד בכל פעם, בפונט הכותרות. הצילום המקורי נפתח בלחיצה. מתחלף לבד, ונעצר ברגע שנוגעים.",
  },
  {
    variant: "proof",
    title: "אפשרות 2 · ציטוט עם הצילום המקורי לידו",
    note: "אותו ציטוט, ולצדו הצילום האמיתי של הביקורת. לחיצה על הצילום מגדילה אותו. בטלפון זה מתקפל לציטוט עם כפתור.",
  },
  {
    variant: "cards",
    title: "אפשרות 3 · קרוסלת צילומים גדולה",
    note: "הצילומים עצמם בגודל קריא, בגלילה אופקית. זו הגרסה שמופיעה עכשיו באתר.",
  },
  {
    variant: "wall",
    title: "לשם השוואה · הקיר הקודם",
    note: "מה שלא אהבת, להשוואה בלבד.",
  },
];

export default function ReviewsLab() {
  return (
    <main className="bg-paper">
      <header className="mx-auto max-w-[1180px] px-6 py-14 text-center md:py-20">
        <h1 className="font-serif text-3xl md:text-[40px]">סקשן ההמלצות · אפשרויות</h1>
        <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-light leading-[1.9] text-ink-muted">
          כל האפשרויות משתמשות בדיוק באותן ביקורות. כדאי לנסות גם בטלפון.
        </p>
      </header>

      {options.map((option) => (
        <div key={option.variant}>
          <div className="border-y border-rule bg-white px-6 py-6 text-center">
            <h2 className="text-[15px] font-medium">{option.title}</h2>
            <p className="mx-auto mt-2 max-w-[640px] text-[13px] font-light leading-[1.8] text-ink-muted">
              {option.note}
            </p>
          </div>
          <ReviewsSection variant={option.variant} id={`reviews-${option.variant}`} />
        </div>
      ))}
    </main>
  );
}
