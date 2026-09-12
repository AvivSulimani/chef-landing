@AGENTS.md

# פרויקט: דף נחיתה לשף

## סטאק
- Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4
- דיפלוי: Vercel (חיבור GitHub → Vercel לפריסה אוטומטית בכל push)
- שפה: עברית בלבד, RTL (`lang="he" dir="rtl"` ב-[layout.tsx](src/app/layout.tsx)), פונט Heebo

## זרימת עבודה
1. עיצוב נבנה ב-Claude Design (canvas) ומאושר עם הלקוח.
2. העיצוב המאושר מוטמע כאן כקומפוננטות React/Tailwind תחת `src/app` ו-`src/components`.
3. כל push ל-`main` (או ל-branch מחובר ב-Vercel) מפעיל דיפלוי אוטומטי.

## MCP servers (`.mcp.json`)
- `github` — שרת GitHub הרשמי (remote, OAuth). אישור חד-פעמי דרך `/mcp` בסשן אינטראקטיבי.
- `vercel` — שרת Vercel הרשמי (remote, OAuth) לניהול פריסות ולוגים ישירות מהצ'אט.
- `context7` — תיעוד ספריות עדכני (ללא צורך באימות).
- `playwright` — בדיקות דפדפן אוטומטיות על הדף החי (ללא צורך באימות).

הרחבות אופציונליות בעתיד: Supabase (טופס יצירת קשר / הזמנות), Figma (ייבוא עיצוב), Stripe/PayPal (תשלומים) — כל אלה דורשים חיבור/אימות דרך הגדרות המשתמש ולא הוגדרו כברירת מחדל.

## פקודות
- `npm run dev` — שרת פיתוח (localhost:3000)
- `npm run build` — build לפרודקשן
- `npm run lint` — ESLint
