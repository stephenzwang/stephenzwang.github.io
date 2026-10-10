import type { SkillCategory } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * TECHNICAL SKILLS
 * ---------------------------------------------------------------------------
 * Categories and skills mirror the SKILLS section of Stephen Wang's resume.
 * Nothing here is invented — if it is not on the resume it does not appear.
 *
 * Naming follows the terms recruiters and ATS filters actually search for
 * ("Node.js", "REST APIs", "CI/CD", "Git"), and redundant tags already implied
 * elsewhere ("API Development", "Database Development", "Responsive Web
 * Design") have been dropped. CI/CD and Git sit under Development Practices.
 *
 * To add a new category, add a `SkillIconName` to `lib/types.ts` and map it in
 * `components/Skills.tsx`.
 */

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    description: "The languages I build applications in.",
    skills: ["JavaScript", "TypeScript", "C#", "PHP", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    icon: "layout",
    description: "Frameworks and libraries for building user interfaces.",
    skills: ["React", "Next.js", "Angular", "Vue.js", "jQuery", "AJAX", "Bootstrap", "Sass"],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    description: "Server-side services, business logic and API development.",
    skills: ["Node.js", "REST APIs", "Web APIs"],
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
    title: "Cloud & Infrastructure",
    icon: "cloud",
    description: "Hosting, containers, and production deployment.",
    skills: ["Azure", "AWS", "Docker", "Linux", "Nginx", "Apache"],
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
    ],
  },
  {
    title: "Development Practices",
    icon: "workflow",
    description: "Version control, delivery pipelines and how I work.",
    skills: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Azure DevOps", "Agile", "Scrum"],
  },
];
