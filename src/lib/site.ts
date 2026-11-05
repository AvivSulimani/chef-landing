/**
 * The public address of the site. It feeds the canonical links, the social share preview, sitemap.xml and
 * robots.txt.
 *
 * On Vercel the production domain is picked up by itself (VERCEL_PROJECT_PRODUCTION_URL). Anywhere else, and in a
 * production build without that variable, the address below is used, so moving the site to another host needs no
 * code change either. To force a different address, for example the "www" version, set NEXT_PUBLIC_SITE_URL.
 */
const FALLBACK = "https://soil-dining.co.il";

function resolveSiteUrl(): string {
  const forced = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (forced) return forced.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return process.env.NODE_ENV === "production" ? FALLBACK : "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
export const siteName = "Soil by Aviv Sulimani";
export const siteDescription =
  "ארוחות פרטיות המתמחות בפיין דיינינג ואוכל עילי, תוך שימוש בחומרי גלם מקומיים ומחוברים לטבע.";
