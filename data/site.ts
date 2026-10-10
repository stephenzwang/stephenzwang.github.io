/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION — EDIT THIS FILE FIRST
 * ---------------------------------------------------------------------------
 * Every value here reflects Stephen Wang's real details, taken from his
 * resume. The positioning is deliberately focused on full-stack software
 * development rather than a long list of job titles.
 */

export const site = {
  name: "Stephen Wang",
  /** Shown in the hero and the browser tab title */
  headline: "Full-Stack Software Developer",
  /** Hero paragraphs — each entry renders as its own paragraph */
  intro: [
    "Full-Stack Software Developer with 10+ years of experience building, modernizing, and maintaining production web applications and business software.",
    "I work across the whole stack — React and Next.js front ends, backend services and REST APIs, SQL and NoSQL databases, third-party integrations, and the deployments and production support that keep them running.",
  ],
  /**
   * Positioning statement. Rendered in the About section for now; written as
   * prose so it can be copy-pasted straight into an application, and
   * keyword-dense enough for ATS matching without reading as a keyword list.
   */
  bio: [
    "I'm a Full-Stack Software Developer with 10+ years of experience building and maintaining production web applications, business software, APIs, e-commerce platforms, CMS solutions, and custom digital products.",
    "My work covers the full application stack: frontend development in React, Next.js, and TypeScript; backend services and REST APIs in Node.js and PHP; SQL Server, MySQL, and PostgreSQL database design; third-party integrations; and the hosting, DNS, SSL, CDN, and CI/CD pipelines that ship it all to production.",
    "I spend most of my time on systems that already exist and matter to a business — modernizing legacy applications, refactoring and re-architecting code, tuning performance and Core Web Vitals, hardening authentication and data handling, and troubleshooting the frontend, backend, database, and deployment problems that surface in production.",
    "I currently work as a Lead Full Stack Developer at WebCodeLive, developing and maintaining production websites and web applications end to end — from architecture and implementation through deployment and ongoing support — while working directly with clients and stakeholders.",
  ],

  /** Canonical production origin (GitHub Pages user account). For project sites, the
 *  repo path is added automatically by the base path; do not include it here. */
  url: "https://stephenzwang.github.io",

  /** Meta description used for SEO, Open Graph and Twitter cards.
   *  Kept under ~160 characters so search engines show it whole. */
  description:
    "Full-Stack Software Developer with 10+ years of experience building and maintaining production web applications, business software, REST APIs, e-commerce platforms and CMS solutions.",

  email: "stephenxw@hotmail.ca",
  location: "Toronto, ON, Canada",
  /** Hero status pill — edit or set to "" to hide it entirely. */
  status: "Open to new opportunities",
  /** Path inside /public */
  resumeUrl: "/resume.pdf",

  socials: {
    /** No GitHub profile is linked from the site — leave as "" to hide every GitHub link. */
    github: "",
    /** No LinkedIn on file — leave as "" to hide every LinkedIn link on the site. */
    linkedin: "",
  },
} as const;

export type NavItem = { id: string; label: string };

/**
 * Section anchors — `id` must match the `id` on the rendered <section>, and the
 * order here is the order the sections render in on the page.
 *
 * There is intentionally no "About" entry: the biography now lives in the hero,
 * so a separate About section would only repeat it. Projects sit directly under
 * the hero so the real client work is what a recruiter sees first.
 */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
