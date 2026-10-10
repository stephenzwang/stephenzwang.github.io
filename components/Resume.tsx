import { Award, Download, ExternalLink, FileText, GraduationCap } from "lucide-react";
import { Chip, PlaceholderBadge } from "@/components/Chip";
import { Section, SectionHeading } from "@/components/Section";
import { certifications, education } from "@/data/resume";
import { experience } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { site } from "@/data/site";
import { assetPath } from "@/lib/paths";
import type { ResumeEntry } from "@/lib/types";

function ResumeBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Award;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-line border-t pt-8">
      <h3 className="text-fg flex items-center gap-2.5 text-base font-semibold tracking-tight">
        <Icon className="text-accent-400 size-4 shrink-0" aria-hidden="true" />
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function EntryList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <ul className="space-y-5">
      {entries.map((entry, index) => (
        <li key={`${entry.title}-${index}`}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-fg text-sm font-medium">{entry.title}</p>
            {entry.placeholder ? <PlaceholderBadge /> : null}
          </div>
          <p className="text-fg-muted mt-1 text-sm">{entry.subtitle}</p>
          <p className="text-fg-subtle mt-0.5 font-mono text-xs">{entry.meta}</p>
          {entry.details?.length ? (
            <ul className="mt-2 space-y-1">
              {entry.details.map((detail, index) => (
                <li key={`${entry.title}-detail-${index}`} className="text-fg-muted text-sm">
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function Resume() {
  return (
    <Section id="resume" labelledBy="resume-heading">
      <SectionHeading
        id="resume-heading"
        eyebrow="Resume"
        title="Resume"
        description="10+ years of experience developing web applications, business software, APIs, e-commerce platforms, CMS solutions, integrations, and custom digital products."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        {/* ---------------------------------------------------------------- */}
        <div className="reveal space-y-10">
          <ResumeBlock icon={FileText} title="Experience">
            <ul className="space-y-5">
              {experience.map((item) => (
                <li key={item.id}>
                  <p className="text-fg text-sm font-medium">{item.title}</p>
                  <p className="text-fg-muted mt-1 text-sm">
                    {item.company} &middot; {item.location}
                  </p>
                  <p className="text-fg-subtle mt-0.5 font-mono text-xs">
                    {item.start} &ndash; {item.end}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-fg-subtle mt-5 text-xs">
              Full detail is in the{" "}
              <a
                href="#experience"
                className="text-accent-400 hover:text-accent-300 underline decoration-dotted underline-offset-4 transition-colors"
              >
                experience timeline
              </a>
              .
            </p>
          </ResumeBlock>

          <ResumeBlock icon={GraduationCap} title="Education">
            <EntryList entries={education} />
          </ResumeBlock>

          {certifications.length > 0 ? (
            <ResumeBlock icon={Award} title="Certifications">
              <EntryList entries={certifications} />
            </ResumeBlock>
          ) : null}
        </div>

        {/* ---------------------------------------------------------------- */}
        <div className="reveal lg:sticky lg:top-24 lg:self-start">
          <div className="surface p-6">
            <h3 className="text-fg text-base font-semibold tracking-tight">Download</h3>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">
              Download my resume for the full picture — experience, technical skills, projects, and
              education, formatted for recruiters and applicant tracking systems.
            </p>

            <a
              href={assetPath(site.resumeUrl)}
              download
              className="bg-accent-600 hover:bg-accent-500 mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/40 transition-colors"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>

            <a
              href={assetPath(site.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Open in browser
            </a>
          </div>

          <div className="mt-6">
            <h3 className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
              Technical skills
            </h3>
            <dl className="mt-5 space-y-4">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <dt className="text-fg text-xs font-semibold">{category.title}</dt>
                  <dd className="text-fg-muted mt-1.5 flex flex-wrap gap-1.5">
                    {category.skills.map((skill, index) => (
                      <Chip
                        key={`resume-${category.title}-skill-${index}`}
                        className="text-[11px]"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
