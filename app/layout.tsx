import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono, Anton } from "next/font/google";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SkipLink } from "@/components/site/skip-link";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

// Display: Anton (heavy condensed, all-caps) — the brand/fight-poster voice, matches the UP
// emblem and is used for every heading. Body: Inter. Numerics: JetBrains Mono.
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteTitle = "Universal Promotions | Puerto Rico Boxing Events & Media";
const siteDescription =
  "Universal Promotions is the digital home for Puerto Rico boxing events, fighter profiles, fight media, sponsors, tickets, and event coverage.";
const socialImage = {
  url: "/media/universal/og/hero-social.jpg",
  width: 1200,
  height: 630,
  alt: "Universal Promotions hero image with a branded boxing ring and arena lights.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · Universal Promotions",
  },
  description: siteDescription,
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  category: "Sports",
  keywords: [
    "Universal Promotions",
    "Puerto Rico boxing",
    "boxing events",
    "fight promotion",
    "boxeo",
    "fighter profiles",
    "fight media",
    "San Juan boxing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: "es_PR",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0e",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: siteName,
  sport: "Boxing",
  areaServed: ["Puerto Rico", "Caribbean"],
  url: siteUrl,
  logo: `${siteUrl}/media/universal/logo/universal-promotions-logo.jpg`,
  image: `${siteUrl}${socialImage.url}`,
  description: siteDescription,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          // Browsers blank the `nonce` attribute in the DOM for security, so the hydrated
          // value differs from the server HTML — a benign, expected mismatch.
          suppressHydrationWarning
          // Static, build-time JSON — no user input. Safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <SkipLink />
          <SmoothScroll>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
