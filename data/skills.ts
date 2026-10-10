import type { SkillCategory } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * TECHNICAL SKILLS
 * ---------------------------------------------------------------------------
 * Categories and skills mirror the SKILLS section of Stephen Wang's resume,
 * in the same order. Nothing here is invented — if it is not on the resume it
 * does not appear.
 *
 * The resume groups cloud tooling, version control and delivery pipelines
 * together under "Cloud & DevOps", and lists Agile / Scrum separately under
 * "Methodologies"; this file follows that split rather than the older
 * "Development Practices" catch-all.
 *
 * Naming follows the terms recruiters and ATS filters actually search for
 * ("Node.js", "REST APIs", "CI/CD", "Git").
 *
 * To add a new category, add a `SkillIconName` to `lib/types.ts` and map it in
 * `components/Skills.tsx`.
 */

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    description: "The languages I build applications in.",
    skills: ["JavaScript", "TypeScript", "C#", "Java", "PHP", "Python", "HTML5", "CSS", "SQL"],
  },
  {
    title: "Frontend",
    icon: "layout",
    description: "Frameworks and libraries for building user interfaces.",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "jQuery",
      "AJAX",
      "Bootstrap",
      "Sass",
      "Responsive Web Design",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    description: "Server-side services, business logic and API development.",
    skills: ["Node.js", "REST APIs", "Web APIs"],
  },
  {
    title: "AI & LLM",
    icon: "ai",
    description: "Building with language models and agentic workflows.",
    skills: ["LLM Integration", "Prompt Engineering", "AI Agents"],
  },
  {
    title: "Databases",
    icon: "database",
    description: "Schema design, query optimization and data access.",
    skills: [
      "SQL Server",
      "MySQL",
      "PostgreSQL",
      "Relational Databases",
      "Non-Relational Databases",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    description: "Hosting, containers, pipelines and production delivery.",
    skills: [
      "Azure",
      "AWS",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Azure DevOps",
      "Linux",
      "Nginx",
      "Apache",
    ],
  },
  {
    title: "Security & Integrations",
    icon: "shield",
    description: "Authentication, authorization and third-party services.",
    skills: [
      "Authentication",
      "Authorization",
      "OAuth",
      "JWT",
      "Payment Integrations",
      "Third-Party API Integration",
    ],
  },
  {
    title: "Testing",
    icon: "test",
    description: "Automated checks across the stack.",
    skills: ["Automated Testing", "Unit Testing", "Integration Testing", "Playwright"],
  },
  {
    title: "Web & CMS",
    icon: "cms",
    description: "Content platforms and web quality.",
    skills: [
      "WordPress",
      "CMS Development",
      "SEO",
      "Core Web Vitals",
      "Accessibility",
      "WCAG",
      "API Development",
      "Database Development",
    ],
  },
  {
    title: "Methodologies",
    icon: "workflow",
    description: "How I plan and deliver work with a team.",
    skills: ["Agile", "Scrum"],
  },
];
