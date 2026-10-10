import { Section, SectionHeading } from "@/components/Section";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading" grid>
      <SectionHeading
        id="projects-heading"
        eyebrow="Projects"
        title="Featured Projects"
        description="Production websites, web applications and platforms I've developed and maintained — each with the work I contributed and a link to the live site."
      />

      <ProjectsExplorer projects={projects} />
    </Section>
  );
}
