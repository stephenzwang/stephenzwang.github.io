import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/data/site";
import { BASE_PATH } from "@/lib/paths";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const title = `${site.name} | Full-Stack Software Developer`;
const canonicalPath = BASE_PATH ? `${BASE_PATH}/` : "/";
/**
 * A committed static PNG, not a `opengraph-image` route: with `output: "export"`
 * that route emits an extensionless file, which GitHub Pages serves as
 * `application/octet-stream` and social crawlers reject.
 * Regenerate with: node --experimental-strip-types scripts/generate-og-image.mts
 */
const ogImagePath = `${BASE_PATH}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  /*
   * Deliberately short — roughly 12 entries. A long list of near-synonym job
   * titles ("frontend developer", "backend developer", "DevOps engineer"…)
   * reads as unfocused and buys nothing; the site is positioned around
   * full-stack software development, so the terms here reinforce that.
   */
  keywords: [
    site.name,
    "Full-Stack Software Developer",
    "software developer",
    "full-stack developer",
    "web application development",
    "business software",
    "REST API development",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "e-commerce development",
    "CMS development",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  applicationName: `${site.name} — Software Developer`,
  category: "technology",
  alternates: {
    canonical: canonicalPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: `${site.name} — Software Developer`,
    title,
    description: site.description,
    url: canonicalPath,
    locale: "en_US",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.headline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImagePath],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#05080e",
  width: "device-width",
  initialScale: 1,
};

/** Structured data helps search engines and recruiter tooling understand the page. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: `${site.url}${BASE_PATH}/`,
  jobTitle: "Full-Stack Software Developer",
  description: site.description,
  email: `mailto:${site.email}`,
  knowsAbout: [
    "Full-Stack Development",
    "Software Development",
    "Web Applications",
    "Business Software",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "PHP",
    "REST APIs",
    "SQL Server",
    "MySQL",
    "PostgreSQL",
    "E-commerce Platforms",
    "Content Management Systems",
    "API Integration",
    "Cloud Deployment",
  ],
  /* Only social profiles that are actually set are emitted. */
  sameAs: [site.socials.github, site.socials.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
         * Marks the document as JavaScript-capable before the first paint. The
         * scroll-reveal styles hide elements only under `.js`, so a visitor
         * without JavaScript never receives the class and never receives the
         * hidden state — no content is ever trapped behind a failed script.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />

        <a
          href="#main-content"
          className="bg-accent-600 sr-only rounded-lg px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />

        <ScrollReveal />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
