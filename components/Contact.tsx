import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { Section, SectionHeading } from "@/components/Section";
import { site } from "@/data/site";

const methods = [
  {
    key: "github",
    label: "GitHub",
    value: "Source code and repositories",
    hint: "Code, experiments and open work",
    href: site.socials.github,
    external: true,
    Icon: GitHubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "Professional profile",
    hint: "Connect and message",
    href: site.socials.linkedin,
    external: true,
    Icon: LinkedInIcon,
  },
  // Entries without a URL (GitHub and LinkedIn are both off by default) are dropped.
].filter((method) => method.href.length > 0);

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading" grid>
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Let's build something useful."
        description="I'm open to new opportunities involving software development, full-stack applications, web platforms, APIs, and business systems."
      />

      <div className="reveal mt-14 max-w-3xl">
        <p className="text-fg-muted text-base leading-relaxed">
          The quickest way to reach me is email — I read everything and usually reply within a
          business day.
        </p>

        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("Contact Form stephenzwang.github.io")}`}
          className="group border-line hover:border-accent-500/40 hover:bg-ink-850/60 mt-8 flex items-center gap-5 rounded-xl border px-6 py-6 transition-colors"
        >
          <span className="border-line bg-ink-850 text-fg-muted group-hover:text-accent-300 group-hover:border-accent-500/40 grid size-12 shrink-0 place-items-center rounded-lg border transition-colors">
            <Mail className="size-[20px]" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-fg-subtle block font-mono text-[11px] tracking-[0.16em] uppercase">
              Email
            </span>
            <span className="text-fg group-hover:text-accent-300 mt-1 block truncate text-lg font-medium transition-colors">
              {site.email}
            </span>
            <span className="text-fg-subtle mt-1 block text-sm">
              Best for role enquiries, questions and project work
            </span>
          </span>
          <ArrowUpRight
            className="text-fg-subtle group-hover:text-accent-300 hidden size-5 shrink-0 transition-colors sm:block"
            aria-hidden="true"
          />
        </a>

        <p className="text-fg-muted mt-8 max-w-xl text-sm leading-relaxed">
          Whether you&rsquo;re hiring for a development role or need help building or improving an
          application, I&rsquo;d be happy to talk.
        </p>
      </div>

      {methods.length > 0 ? (
        <ul className="divide-line reveal mt-10 max-w-3xl divide-y">
          {methods.map(({ key, label, value, hint, href, external, Icon }) => (
            <li key={key}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={
                  external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`
                }
                className="group hover:bg-ink-850/60 -mx-3 flex items-center gap-4 rounded-xl px-3 py-5 transition-colors"
              >
                <span className="border-line bg-ink-850 text-fg-muted group-hover:text-accent-300 group-hover:border-accent-500/40 grid size-10 shrink-0 place-items-center rounded-lg border transition-colors">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="text-fg-subtle block font-mono text-[11px] tracking-[0.16em] uppercase">
                    {label}
                  </span>
                  <span className="text-fg mt-1 block truncate text-sm font-medium">{value}</span>
                  <span className="text-fg-subtle mt-0.5 block text-xs">{hint}</span>
                </span>

                <ArrowUpRight
                  className="text-fg-subtle group-hover:text-accent-300 size-4 shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
