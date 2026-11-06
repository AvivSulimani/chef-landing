import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { a11yBootScript } from "@/lib/a11y-boot";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: "Soil",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script below adds data-a11y-* attributes to <html> before React starts.
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">
          דלגו לתוכן הראשי
        </a>
        <AccessibilityMenu />
        {children}
      </body>
    </html>
  );
}
