import { ArrowUp, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { navItems, site } from "@/data/site";

const monogram = site.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line relative border-t">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="border-line bg-ink-850 text-fg grid size-9 place-items-center rounded-lg border font-mono text-[13px] font-semibold"
              >
                {monogram}
              </span>
              <span className="text-fg text-sm font-semibold tracking-tight">{site.name}</span>
            </a>
            <p className="text-fg-subtle mt-4 max-w-sm text-sm leading-relaxed">
              Full-Stack Software Developer with 10+ years of experience building and maintaining
              production web applications, business software, APIs, e-commerce platforms and CMS
              solutions.
            </p>
            <p className="text-fg-muted mt-4 inline-flex items-center gap-2 text-sm">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span>
                <span className="text-fg-subtle">Based in </span>
                {site.location}
              </span>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
              Experience
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-fg-muted hover:text-fg text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.github ? (
                <li>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-fg inline-flex items-center gap-2.5 text-sm transition-colors"
                  >
                    <GitHubIcon className="size-4" />
                    GitHub
                  </a>
                </li>
              ) : null}
              {site.socials.linkedin ? (
                <li>
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-fg inline-flex items-center gap-2.5 text-sm transition-colors"
                  >
                    <LinkedInIcon className="size-4" />
                    LinkedIn
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg-muted hover:text-fg inline-flex items-center gap-2.5 text-sm transition-colors"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-line mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="text-fg-subtle text-xs">
            &copy; {year} {site.name}
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#home"
              className="text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              Back to top
              <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
