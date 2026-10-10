import type { CSSProperties } from "react";
import { ArrowRight, Cloud, Database, Mail, PanelsTopLeft, Server } from "lucide-react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";

/**
 * Decorative "stack" panel. Purely presentational — it communicates the shape
 * of the work without resorting to stock imagery or clichéd developer art.
 *
 * Layer titles mirror the category names in `data/skills.ts` (which in turn
 * mirror the resume's SKILLS section), so the hero and the Skills section tell
 * the same story.
 */
const layers = [
  {
    icon: PanelsTopLeft,
    title: "Frontend",
    detail: "Interfaces, components and web applications",
    tech: ["React", "Next.js", "Angular", "TypeScript", "HTML5", "CSS3"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    detail: "Services, REST APIs and business logic",
    tech: ["Node.js", "REST APIs", "Web APIs", "PHP", "C#"],
  },
  {
    icon: Database,
    title: "Databases",
    detail: "Schema design, queries and data access",
    tech: ["SQL Server", "MySQL", "PostgreSQL", "Non-Relational"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    detail: "Hosting, deployment and production support",
    tech: ["Azure", "AWS", "Docker", "GitHub Actions", "Linux"],
  },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(75%_65%_at_50%_0%,#000_5%,transparent_100%)]"
      />
      {/* Animated point-cloud field. Fades out toward the bottom of the section
          so it never competes with the copy below. */}
      <HeroBackdrop className="-z-10 opacity-70 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]" />
      <div aria-hidden="true" className="bg-glow pointer-events-none absolute inset-0 -z-10" />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          {/* ---------------------------------------------------------------- */}
          <div>
            {site.status ? (
              <p className="reveal border-line bg-ink-850/70 text-fg-muted inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-3.5 pl-2.5 text-xs font-medium">
                <span aria-hidden="true" className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {site.status}
              </p>
            ) : null}

            <h1
              id="home-heading"
              className="word-reveal mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
            >
              {site.name.split(" ").map((word, index, words) => (
                <span
                  key={`${word}-${index}`}
                  style={{ "--word-delay": `${index * 110}ms` } as CSSProperties}
                >
                  {word}
                  {index < words.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>

            <p className="reveal text-accent-300 mt-4 font-mono text-base sm:text-lg">
              {site.headline}
            </p>

            <div className="reveal mt-6 max-w-xl space-y-3">
              {site.intro.map((paragraph, index) => (
                <p key={index} className="text-fg-muted text-base leading-relaxed sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="bg-accent-600 hover:bg-accent-500 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/40 transition-colors"
              >
                View Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="border-line bg-ink-850/70 text-fg hover:bg-ink-800 hover:border-line-strong inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#resume"
                className="text-fg-muted hover:text-fg inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              >
                View Resume
              </a>
            </div>

            <div className="reveal mt-10 flex items-center gap-2">
              {site.socials.github ? (
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="border-line bg-ink-850/70 text-fg-muted hover:text-fg hover:bg-ink-800 grid size-10 place-items-center rounded-lg border transition-colors"
                >
                  <GitHubIcon className="size-[18px]" />
                </a>
              ) : null}
              {site.socials.linkedin ? (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="border-line bg-ink-850/70 text-fg-muted hover:text-fg hover:bg-ink-800 grid size-10 place-items-center rounded-lg border transition-colors"
                >
                  <LinkedInIcon className="size-[18px]" />
                </a>
              ) : null}
              {site.socials.github || site.socials.linkedin ? (
                <span aria-hidden="true" className="bg-line mx-1.5 h-6 w-px" />
              ) : null}
              <a
                href={`mailto:${site.email}`}
                className="text-fg-muted hover:text-fg inline-flex items-center gap-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{site.email}</span>
                <span className="sm:hidden">Email</span>
              </a>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          <div className="reveal" data-reveal="scale">
            <div className="surface relative overflow-hidden p-1.5 shadow-2xl shadow-black/40">
              <div className="bg-ink-900/80 rounded-[0.7rem] p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
                    Across the stack
                  </h2>
                  <p className="text-fg-subtle font-mono text-[11px]">frontend&nbsp;&rarr;&nbsp;production</p>
                </div>

                <ol className="relative mt-6">
                  <span
                    aria-hidden="true"
                    className="from-accent-500/50 via-line absolute top-2.5 bottom-6 left-4 w-px bg-gradient-to-b to-transparent"
                  />
                  {layers.map((layer) => (
                    <li key={layer.title} className="relative z-10 pb-7 last:pb-0">
                      <div className="flex items-start gap-3.5">
                        <span className="border-line bg-ink-850 text-accent-400 grid size-8 shrink-0 place-items-center rounded-lg border">
                          <layer.icon className="size-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-fg text-sm font-medium">{layer.title}</p>
                          <p className="text-fg-subtle mt-0.5 text-xs">{layer.detail}</p>
                          <p className="text-fg-muted mt-2 font-mono text-[11px] leading-relaxed">
                            {layer.tech.join(" · ")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
