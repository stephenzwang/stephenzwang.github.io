import type { ExperienceItem } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * PROFESSIONAL EXPERIENCE
 * ---------------------------------------------------------------------------
 * Every entry is taken from Stephen Wang's resume — employers, titles, locations
 * and dates are real, and each role is written as a short set of outcome-focused
 * responsibilities rather than a long technology list.
 *
 * Measurable results the resume states (e.g. 40% traffic, 30% product sales)
 * are folded into the responsibility line that produced them, rather than split
 * into a separate "achievements" list.
 *
 * NOTE ON CONFIDENTIALITY: professional work is described at a level that does
 * not disclose proprietary systems, client names that are not already public, or
 * internal metrics beyond those on the resume.
 */

export const experience: ExperienceItem[] = [
  {
    id: "exp-webcodelive",
    title: "Lead Full Stack Developer",
    company: "WebCodeLive",
    location: "Toronto, ON",
    start: "Jan 2025",
    end: "Present",
    current: true,
    responsibilities: [
      "Lead development of modern web applications with Next.js, React, TypeScript, and JavaScript, from technical planning through production deployment and ongoing maintenance.",
      "Architect and develop reusable components and application features across frontend and server-side layers.",
      "Lead legacy application modernization — migrations, refactoring, architecture improvements, and codebase optimization.",
      "Integrate third-party APIs and external services, implementing data handling, validation, error handling, and application integrations.",
      "Diagnose complex application, performance, integration, and deployment issues across production codebases.",
      "Improve SEO, Core Web Vitals, accessibility, page performance, and responsive behavior across production applications.",
      "Work directly with clients and stakeholders, providing technical direction and leading delivery of new features and improvements.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "REST APIs", "Core Web Vitals"],
    placeholder: false,
  },
  {
    id: "exp-palmer-marketing",
    title: "Full Stack Developer",
    company: "Palmer Marketing",
    location: "Mississauga, ON",
    start: "Sept 2021",
    end: "Jan 2025",
    responsibilities: [
      "Built and maintained WordPress websites and custom business solutions using PHP, JavaScript, HTML, CSS, and MySQL.",
      "Developed custom WordPress themes, plugins, templates, and functionality tailored to client and business requirements.",
      "Implemented server-side PHP functionality, database integrations, forms, authentication, and custom CMS features.",
      "Integrated third-party APIs and services, including payment platforms, analytics, authentication, maps, and other external services.",
      "Managed website hosting, DNS, SSL, CDN, staging environments, backups, and deployments.",
      "Optimized websites for SEO, Core Web Vitals, accessibility, responsive design, and performance.",
      "Troubleshot and resolved WordPress, PHP, JavaScript, database, and production issues while working directly with clients and project teams.",
    ],
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "HTML5", "CSS", "REST APIs"],
    placeholder: false,
  },
  {
    id: "exp-landpower-real-estate",
    title: "Digital Marketing Designer",
    company: "Landpower Real Estate",
    location: "Richmond Hill, ON",
    start: "Jan 2020",
    end: "Sept 2021",
    responsibilities: [
      "Designed and developed the company website with a focus on performance, SEO, responsive design, and user experience.",
      "Developed custom internal software, including a property management system covering properties, equipment, maintenance, legal requirements, and personnel.",
      "Built an internal graphic design platform with reusable templates for marketing materials and business documents.",
      "Created digital marketing campaigns and assets that contributed to a 40% increase in website traffic.",
      "Combined web development, software development, graphic design, and digital marketing to support business objectives.",
    ],
    technologies: ["Web Development", "Custom Software", "SEO", "Responsive Design"],
    placeholder: false,
  },
  {
    id: "exp-canada-computers",
    title: "Web Designer",
    company: "Canada Computers",
    location: "Richmond Hill, ON",
    start: "Mar 2018",
    end: "Sept 2019",
    responsibilities: [
      "Developed new functionality and pages for a large-scale e-commerce website, improving the online purchasing experience.",
      "Built new e-commerce features that contributed to a 30% increase in product sales.",
      "Maintained and optimized existing functionality, resolving bugs and improving website reliability.",
      "Collaborated with internal teams on website updates, new features, and e-commerce improvements.",
    ],
    technologies: ["E-commerce", "Web Development", "JavaScript", "HTML5", "CSS"],
    placeholder: false,
  },
  {
    id: "exp-impact-north",
    title: "Web and Video Designer",
    company: "Impact North",
    location: "Vaughan, ON",
    start: "May 2015",
    end: "Mar 2018",
    responsibilities: [
      "Designed and developed responsive client websites using HTML, CSS, PHP, jQuery, and WordPress for residential construction and homebuilding companies.",
      "Developed custom website functionality and maintained client sites throughout their production lifecycle.",
      "Delivered digital projects for companies including Greenpark, Starlane, Treasure Hill, and Unico.",
      "Produced video, motion graphics, commercials, and social media assets, and converted architectural sketches and floor plans into digital illustrations.",
    ],
    technologies: ["HTML5", "CSS", "PHP", "jQuery", "WordPress"],
    placeholder: false,
  },
];
