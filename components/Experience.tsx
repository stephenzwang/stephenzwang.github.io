import { Calendar, MapPin } from "lucide-react";
import { Chip, PlaceholderBadge } from "@/components/Chip";
import { Section, SectionHeading } from "@/components/Section";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Where I've worked"
        description="10+ years developing and maintaining production software — full-stack applications, APIs, databases, infrastructure, and long-term support."
      />

      <ol className="border-line mt-14 border-l">
        {experience.map((item, index) => {
          /*
           * Visual hierarchy: the current role and the first two software
           * development roles are flagged "core". Everything after that is
           * earlier career history — still listed, but with a quieter marker so
           * the timeline reads Developer → Full-Stack → Lead rather than
           * putting the design years on equal footing.
           */
          const core = index < 2;
          return (
            <li key={item.id} className="reveal relative pb-14 pl-8 last:pb-0 sm:pl-12">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={`bg-ink-950 absolute -left-[5px] top-2 size-2.5 rounded-full border-2 ${
                  item.current
                    ? "border-accent-500"
                    : core
                      ? "border-line-strong"
                      : "border-line"
                }`}
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-fg text-lg font-semibold tracking-tight sm:text-xl">
                  {item.title}
                </h3>
                {item.current ? <Chip tone="accent">Current</Chip> : null}
                {item.placeholder ? <PlaceholderBadge /> : null}
              </div>

              <p className="text-fg-muted mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                <span className="text-fg font-medium">{item.company}</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {item.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {item.start} &ndash; {item.end}
                  </span>
                </span>
              </p>

              {item.summary ? (
                <p className="text-fg-muted mt-4 max-w-3xl text-sm leading-relaxed sm:text-[0.9375rem]">
                  {item.summary}
                </p>
              ) : null}

              <div className="mt-6">
                <h4 className="text-fg-subtle font-mono text-[11px] tracking-[0.16em] uppercase">
                  Responsibilities
                </h4>
                <ul className="mt-3 grid gap-x-10 gap-y-2 lg:grid-cols-2">
                  {item.responsibilities.map((line, index) => (
                    <li
                      key={`${item.id}-responsibility-${index}`}
                      className="text-fg-muted flex gap-2.5 text-sm leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent-500/70 mt-2 size-1 shrink-0 rounded-full"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <li key={`${item.id}-tech-${index}`}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
