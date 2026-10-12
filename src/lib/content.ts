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
 * Customer reviews are shown as the original screenshots, from several
 * sources. Every file is normalised to one canvas width so text keeps the
 * same scale across cards.
 *
 * `mobile` is an optional phone-sized screenshot; until one exists the
 * desktop image is used on small screens too.
 */
export type ReviewImage = { src: string; width: number; height: number };

/**
 * "web" screenshots (Google, Facebook) are wide and shown at 720px.
 * "chat" screenshots come from a phone and are shown at a fixed 0.4 scale of
 * their natural width, which puts their text at about the same size (~13.5px).
 */
export type ReviewLayout = "web" | "chat";

export const REVIEW_WEB_WIDTH = 720;
export const REVIEW_CHAT_SCALE = 0.36;

export type ReviewCard = {
  id: string;
  layout: ReviewLayout;
  /** Where the review was written; shown only to assistive tech. */
  source: "Google" | "WhatsApp" | "Instagram" | "Facebook";
  author: string;
  alt: string;
  /** Plain-text version of the screenshot, for screen readers and search. */
  transcript: string;
  desktop: ReviewImage;
  mobile?: ReviewImage;
};

export const reviewCards: ReviewCard[] = [
  {
    id: "omri",
    layout: "web",
    source: "Google",
    author: "עומרי רפאלי",
    alt: "ביקורת גוגל בת 5 כוכבים מאת עומרי רפאלי, עם תמונות של מנות",
    transcript:
      "אביב יקר, תודה לך על ערב מיוחד במינו. על נדיבות, מקצועיות ושקט נפשי. נטע ואתה, בדרך שקטה ומאורגנת הענקתם לנו ערב בלתי נשכח, עם האנשים והטעמים האהובים עלינו ביותר. תודה מקרב לב.",
    desktop: { src: "/reviews/desktop/omri.png", width: 852, height: 464 },
  },
  {
    id: "abigail",
    layout: "web",
    source: "Google",
    author: "abigail r",
    alt: "ביקורת גוגל בת 5 כוכבים מאת abigail r על החתונה",
    transcript:
      "אביב המקסים תודה על החתונה המושלמת! האוכל הכי טעים שאכלנו בחתונה. באמת. אם אתם מחפשים קייטרינג שהוא משהו קצת אחר, כזה שהאורחים לא יפסיקו לדבר עליו גם הרבה אחרי האירוע אביב הוא הכתובת. מהרגע שהחתונה נגמרה אנחנו רק מקבלים הודעות על האוכל. כולם התלהבו בטירוף ואמרו כמה היה טעים ומיוחד. אפילו הספקים שלנו, שכבר היו בלא מעט חתונות, אמרו שזה הקייטרינג הכי טוב שהם אכלו. אביב היה פשוט מדהים לאורך כל הדרך. הוא ליווה אותנו, היה קשוב לכל בקשה, ובנה לנו תפריט שהתאים בדיוק למה שרצינו. היו לנו אורחים טבעונים, צמחונים, רגישים לגלוטן (כלה צליאקית זה לא אירוע קל) ועוד כל מיני בקשות, והוא דאג שלכולם יהיו מנות מושקעות וטעימות, בלי שאף אחד ירגיש שמתפשרים. מעבר לאוכל, היה פשוט כיף לעבוד איתו. הוא מקצועי, רגוע, זמין, ונתן לנו תחושה שיש על מי לסמוך. ביום האירוע הכול התנהל בצורה מושלמת, ואנחנו יכולים להגיד בלב שלם שזו הייתה אחת הבחירות הכי טובות שעשינו.",
    desktop: { src: "/reviews/desktop/abigail.png", width: 852, height: 498 },
  },
  {
    id: "adar",
    layout: "web",
    source: "Google",
    author: "אדר קדוש",
    alt: "ביקורת גוגל בת 5 כוכבים מאת אדר קדוש על ארוחת טעימות בצימר",
    transcript:
      "אביב הוא 10 מ-10! הגיע בשבילנו עד הצימר בעין הוד לבשל ארוחת טעימות מדהימה לזוג לכבוד יום הולדת 30, הכל מחומרי גלם מקומיים וטריים, אוכל מעולה וחוויה יוצאת דופן - מומלץ מאוד!",
    desktop: { src: "/reviews/desktop/adar.png", width: 852, height: 226 },
  },
  {
    id: "shiran",
    layout: "web",
    source: "Google",
    author: "Shiran Michaeli",
    alt: "ביקורת גוגל בת 5 כוכבים מאת Shiran Michaeli על אירוע ברית בבית",
    transcript:
      "חגגנו אירוע ברית בבית עם כ-30 אורחים. שף אביב ונטע המקסימה הגיעו כמה שעות לפני האירוע, ארגנו ועיצבו שולחן מהמם עם פרחים, והכול היה נראה מושלם כשהאורחים הגיעו. לאחר מכן, הוגשו מנות ראשונות ועיקריות, והאוכל היה ברמה גבוהה וטעים במיוחד! האורחים לא הפסיקו לפרגן לשף אביב על המטעמים ואנחנו כל כך שמחנו שעשינו בחירה נכונה. לבסוף הוגשו קינוחים מושלמים שהשאירו לנו טעם של עוד... בסיום האירוע, אביב ונטע השאירו את המטבח נקי ומצוחצח, כאילו לא היה אירוע בכלל. מעבר לאוכל המדהים, אביב ונטע הם אנשים מקסימים, חייכנים ונעימים, והיה פשוט כיף שהם היו חלק מהאירוע שלנו ונכנסו אלינו הביתה באווירה כל כך טובה. תודה לכם מכל הלב שהייתם חלק מהשמחה שלנו.",
    desktop: { src: "/reviews/desktop/shiran.png", width: 852, height: 426 },
  },
  {
    id: "shelly",
    layout: "web",
    source: "Google",
    author: "Shelly Sitton",
    alt: "ביקורת גוגל בת 5 כוכבים מאת Shelly Sitton על ערב טעימות זוגי",
    transcript:
      "אני חייבת לפרגן מהלב על החוויה המטורפת שהייתה לנו אתמול. בן הזוג שלי הפתיע אותי בערב חגיגי לציון השנה שלנו, וזה לגמרי היה אחד הערבים הכי מיוחדים שחוויתי. אביב שליווה אותנו לאורך כל הערב היה פשוט יוצא דופן. לא רק בבישול, אלא גם בנוכחות, בהגשה ובהסברים. הוא הגיש כל מנה בעצמו, פירט עליה בצורה מרתקת, ובעיקר יצר אווירה מדויקת, נעימה וסוחפת. תפריט של עשר מנות שלקח אותנו למסע בין עונות השנה, מקיץ לחורף, כשכל מנה מובילה בטעם, ברגש ובחוויה לשלב הבא. והייתה מנה אחת שלא הצלחתי להפסיק לחייך מרוב הנאה. פסטה מיוחדת עם מילוי דלעת וסלרי שגרם לי להבין כמה הערב הזה מיוחד. השילוב בין האוכל המטורף, הסיפור שאביב בנה, והשירות האישי והמדויק הפך את כל החוויה לבלתי נשכחת. אין ספק שאני עוד אחזור.",
    desktop: { src: "/reviews/desktop/shelly.png", width: 852, height: 551 },
  },
  {
    id: "efrat",
    layout: "web",
    source: "Google",
    author: "Efrat Gorohovski",
    alt: "ביקורת גוגל בת 5 כוכבים מאת Efrat Gorohovski על ארוחת יום הולדת",
    transcript:
      "שף אביב המקסים, ערך לנו ארוחת ערב מדהימה לכבוד יום הולדת שחגגנו. בין היתר בתפריט סשימי דג עם שסק! כן כן שסק מהעץ שלו. טרטר דגי ים על עלי כובע הנזיר - אחד הנדירים שאכלתי. זוקיני עם פטל ואגוזי מלך, ברוסקטה עם מבחר עגבניות וריקוטה שהוא מכין בעצמו - אלוהי. פוקצ'ה בליווי ריבית תפוזי דם וחמאה עם לימון כבוש... ואלו היו רק חלק המנות הראשונות... המטבח הקטן שלי לא מאמין עד עכשיו שזה מה שאפשר להוציא ממנו... היום עוד נשנשתי מהשעועית ברוטב מיסו שאי אפשר להפסיק לאכול אותה ואני מחכה בקוצר רוח לסלט עם הפקוס ולפסטה שעוד מחכים לי במקרר. ולסיום הקינוחים המעולים ובראשם הפינסטייר והגלידה גרניום לימוני המוש!!!! אנחנו כבר מתכננים את הפעם הבאה שנזמין אותו. היה כיף!",
    desktop: { src: "/reviews/desktop/efrat.png", width: 852, height: 400 },
  },
  {
    id: "alona",
    layout: "chat",
    source: "WhatsApp",
    author: "אלונה",
    alt: "הודעת וואטסאפ מאלונה: תודה על ערב מיוחד",
    transcript:
      "היי אביב, רק עכשיו ירדתי מהענן שהייתי עליו. אז אני חייבת להגיד לך תודה על אתמול! היה טעים ביותר, ייחודי ושניכם השרתם אווירה כזו רגועה ונינחה. תודה על ערב מיוחד. תשלח לי את הפרטי אינסטגרם שלך כי כמה בנות ביקשו.",
    desktop: { src: "/reviews/chat/alona.jpg", width: 918, height: 831 },
  },
  {
    id: "medina",
    layout: "chat",
    source: "WhatsApp",
    author: "מדינה",
    alt: "הודעת וואטסאפ ממדינה על ארוחת טעימות",
    transcript:
      "האירוע היה מדויק מוקפד מושקע. הצוות עמד בזמנים. התאים את התפריט לכל האנשים שחלקם די בעייתים באוכל. ממש חוויה קולינרית כיפית מומלץ מאוד!",
    desktop: { src: "/reviews/chat/medina.jpg", width: 830, height: 686 },
  },
  {
    id: "shiran-wa",
    layout: "chat",
    source: "WhatsApp",
    author: "שירן",
    alt: "הודעת וואטסאפ משירן: הארוחה הייתה מיוחדת, עשירה, טעימה ומפנקת",
    transcript:
      "היי אביב, תודה רבה על אתמול. הארוחה הייתה מיוחדת, עשירה, טעימה ומפנקת. בכל ביס הרגשתי את המחשבה מאחורי המנה. שמחתי להכיר.",
    desktop: { src: "/reviews/chat/shiran-wa.jpg", width: 860, height: 630 },
  },
];

const reviewOrder = [
  "omri",
  "alona",
  "abigail",
  "medina",
  "adar",
  "shiran",
  "shelly",
  "shiran-wa",
  "efrat",
];

export const orderedReviewCards: ReviewCard[] = reviewOrder.map((id) => {
  const card = reviewCards.find((c) => c.id === id);
  if (!card) throw new Error(`Unknown review card: ${id}`);
  return card;
});
