export const business = {
  name: "Soil",
  owner: "Aviv Sulimani",
  ownerHe: "אביב סולימני",
  tagline:
    "ארוחות פרטיות המתמחות בפיין דיינינג ואוכל עילי, תוך שימוש בחומרי גלם מקומיים ומחוברים לטבע",
  phone: "054-225-3132",
  phoneHref: "tel:0542253132",
  whatsapp: "https://api.whatsapp.com/send?phone=972542253132",
  email: "Avivsulimani0@gmail.com",
  location: "גבת",
  waze: "https://waze.com/ul?q=%D7%92%D7%91%D7%AA&z=10&navigate=yes",
  instagram: "https://www.instagram.com/soil_by_aviv_sulimani/",
  facebook: "https://www.facebook.com/profile.php?id=61571565069492",
};

export const nav = [
  { label: "אודות", href: "#about" },
  { label: "שירותים", href: "#services" },
  { label: "ביקורות", href: "#reviews" },
  { label: "צור קשר", href: "#contact" },
];

export const story = {
  eyebrow: "אודות",
  heading: "מתוך אהבה לאדמה",
  paragraphs: [
    "Soil הוא עסק לארוחות פרטיות שנולד מתוך אהבה לאדמה, לעונתיות, ולמטבח מקומי עכשווי. הסיפור שלנו מתחיל בחיבור פשוט אך עמוק – בין חומרי גלם טריים, לבין טכניקות בישול שמכבדות את המקור אך בוראות ממנו משהו חדש.",
    "אנחנו יוצרים חוויות קולינריות חד־פעמיות, מותאמות אישית, בכל פעם מחדש. המנות שלנו נולדות מתוך ההקשר – של העונה, של המקום, של האנשים שסביב השולחן. בכל אירוע אנחנו מבשלים עם חומרי גלם טריים מהאזור, מיצרנים קטנים שאנחנו עובדים איתם לאורך זמן, לעיתים גם כאלו שפשוט גדלים בטבע סביבנו.",
    "הטעמים ב-Soil נעים בין עדין לעז, בין צלייה מהירה על גריל יפני לקלריפיקציה מדויקת של נוזלים, בין שמנים שמופקים במקום – לבין התססות שמתחילות שבועות מראש. התוצאה היא תפריט שמשתנה כל הזמן, אך תמיד משקף את הגישה שלנו: אוכל מקומי, מדויק, מלא נוכחות.",
    "Soil נבנה כדי לייצר שולחן אחר – כזה שמזמין סקרנות, הקשבה, וחוויה אמיתית של עונג. אנחנו מגיעים עד הבית, מתחברים אל המקום, ומקיימים בו רגע שלם של אירוח, טעמים ורוח.",
  ],
};

export type ServiceId =
  | "tasting"
  | "sharing"
  | "weddings"
  | "consulting"
  | "events";

export type Service = {
  id: ServiceId;
  title: string;
  eyebrow: string;
  shortLabel: string;
  body: string;
  image: string;
  imagePosition?: string;
  cta: string;
};

export const services: Service[] = [
  {
    id: "tasting",
    title: "ארוחות טעימות",
    eyebrow: "TASTING MENU",
    shortLabel: "ארוחות טעימות",
    body: "תפריטים מרובי מנות שמוגשים לפי סדר מדויק, בקצב מוקפד, עם דגש על חומרי גלם עונתיים, טכניקות מתקדמות וסיפור קולינרי שמתפתח לאורך הארוחה.",
    image: "/images/romaine.jpg",
    cta: "הזמינו עכשיו",
  },
  {
    id: "sharing",
    title: "ארוחות שארינג",
    eyebrow: "SHARING MENU",
    shortLabel: "ארוחות שארינג",
    body: "שולחנות שופעים עם מנות המוגשות למרכז השולחן, שמעודדות חיבור, שיח ותחושת בית – באווירה מוקפדת ואלגנטית מצד אחד וקלילה וחופשית מהצד השני.",
    image: "/images/event.jpg",
    imagePosition: "center 62%",
    cta: "הזמינו עכשיו",
  },
  {
    id: "weddings",
    title: "חתונות קטנות",
    eyebrow: "עד 150 אורחים",
    shortLabel: "חתונות קטנות",
    body: "חתונות אינטימיות ובוטיקיות, בליווי קולינרי מלא מהתפריט ועד ההגשה – תפריט טעימות או שארינג בהתאמה אישית לזוג, לעונה וללוקיישן, כך שגם אירוע גדול שומר על תחושת ארוחה ביתית ומדויקת.",
    image: "/images/plating.jpg",
    cta: "הזמינו עכשיו",
  },
  {
    id: "consulting",
    title: "ליווי וייעוץ קולינרי",
    eyebrow: "לעסקי מזון",
    shortLabel: "ייעוץ לעסקי מזון",
    body: "ייעוץ קולינרי לעסקים בתחום המזון – מסעדות, קייטרינג, בתי קפה, יקבים, לוקיישנים לאירועים ועוד. השירות כולל פיתוח תפריטים מקוריים, חידוד זהות קולינרית, התאמה לעונות ולשוק המקומי, שיפור תהליכי עבודה במטבח, ליווי בהקמה או מיתוג מחדש, והכשרות לצוותים.",
    image: "/images/labneh.jpg",
    cta: "דברו איתנו",
  },
  {
    id: "events",
    title: "ליווי קולינרי לאירועים",
    eyebrow: "פרטיים ועסקיים",
    shortLabel: "ליווי אירועים",
    body: "תכנון וליווי קולינרי מלא לאירועים פרטיים ועסקיים – מיום הולדת אינטימי ועד השקה יוקרתית או ערב חברה. השירות כולל בניית תפריט מותאם אישית, בחירת חומרי גלם עונתיים, גיבוש סגנון הגשה, התאמה ללוקיישן ולסוג הקהל, וביצוע מדויק מהשלב הראשוני ועד סוף הערב.",
    image: "/images/cabbage.jpg",
    cta: "הזמינו עכשיו",
  },
];

/**
 * Reviews are transcribed by hand from the Google Business listing.
 * Placeholder entries stay until the real ones are supplied.
 */
export type Review = {
  text: string;
  author: string;
  when: string;
  rating: number;
};

export const reviewsSummary = {
  rating: "[5.0]",
  count: "[12]",
  googleUrl: "",
  isPlaceholder: true,
};

export const reviews: Review[] = [
  {
    text: "[טקסט הביקורת מגוגל יופיע כאן. הבלוק מציג עד ארבע שורות, ומה שארוך מזה נחתך.]",
    author: "[שם הלקוח]",
    when: "[לפני חודשיים]",
    rating: 5,
  },
  {
    text: "[ביקורת שנייה. אורכי הביקורות משתנים, ולכן כל העמודות מיושרות לגובה אחיד.]",
    author: "[שם הלקוח]",
    when: "[לפני 3 חודשים]",
    rating: 5,
  },
  {
    text: "[ביקורת שלישית. אם יש פחות משלוש ביקורות, הבלוק מצמצם את הגריד בהתאם.]",
    author: "[שם הלקוח]",
    when: "[לפני 5 חודשים]",
    rating: 5,
  },
];
