import {
  Blocks,
  Cloud,
  Code,
  Database,
  PanelsTopLeft,
  Server,
  ShieldCheck,
  TestTube,
  Workflow,
} from "lucide-react";
import { Chip } from "@/components/Chip";
import { Section, SectionHeading } from "@/components/Section";
import { skillCategories } from "@/data/skills";
import type { SkillIconName } from "@/lib/types";

/**
 * Icons are resolved by name so the data file stays plain, serialisable data.
 */
function CategoryIcon({ name, className }: { name: SkillIconName; className?: string }) {
  const props = { className, "aria-hidden": true } as const;
  switch (name) {
    case "code":
      return <Code {...props} />;
    case "layout":
      return <PanelsTopLeft {...props} />;
    case "server":
      return <Server {...props} />;
    case "database":
      return <Database {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    case "test":
      return <TestTube {...props} />;
    case "cms":
      return <Blocks {...props} />;
    case "workflow":
      return <Workflow {...props} />;
  }
}

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading" grid>
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="Technical Skills"
        description="The tools and practices I use across the stack."
      />

      <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div key={category.title} className="reveal border-line border-t pt-6">
            <div className="flex items-center gap-3">
              <span className="border-line bg-ink-850 text-accent-400 grid size-9 shrink-0 place-items-center rounded-lg border">
                <CategoryIcon name={category.icon} className="size-[18px]" />
              </span>
              <h3 className="text-fg text-base font-semibold tracking-tight">{category.title}</h3>
            </div>

            <p className="text-fg-subtle mt-3 text-sm leading-relaxed">{category.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <li key={`${category.title}-skill-${index}`}>
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
