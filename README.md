# דף נחיתה לשף

תשתית Next.js + TypeScript + Tailwind CSS, מוכנה לדיפלוי ל-Vercel דרך חיבור ל-GitHub.

## פיתוח מקומי

```bash
npm install
npm run dev
```

האתר יעלה על http://localhost:3000

## פריסה (Vercel + GitHub)

1. צרו ריפו ב-GitHub והעלו אליו את הפרויקט (ראו הוראות למטה).
2. היכנסו ל-[vercel.com/new](https://vercel.com/new), חברו את חשבון ה-GitHub, ובחרו את הריפו.
3. Vercel מזהה Next.js אוטומטית — אין צורך בהגדרות נוספות.
4. מאותו רגע כל `git push` ל-`main` יפרוס גרסה חדשה אוטומטית, ול-branch אחר ייפתח Preview Deployment.

## חיבורי MCP

הפרויקט כולל `.mcp.json` עם שרתי MCP ל-GitHub, Vercel, Context7 (תיעוד) ו-Playwright (בדיקות דפדפן).
שרתי GitHub ו-Vercel דורשים אישור OAuth חד-פעמי — בפתיחת סשן אינטראקטיבי של Claude Code הריצו `/mcp` ואשרו את החיבור.
