import type { ProjectItem } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * PROJECTS — PRODUCTION WEBSITES & WEB PLATFORMS
 * ---------------------------------------------------------------------------
 * Ten live sites, in the order supplied. Each card shows a screenshot captured
 * from the live site, what the platform does, the role held on that work, the
 * specific work contributed, the stack it was built with, and a link to the
 * page.
 *
 * The employer in each `role` comes from the resume:
 *   - WebCodeLive                 -> Lead Full Stack Developer
 *   - Palmer Marketing            -> Full Stack Developer
 *   - Landpower Real Estate       -> Digital Marketing Designer
 *   - Canada Computers            -> Web Designer
 *   - Impact North                -> Web and Video Designer
 *
 * `technologies` lists the stack for that employer as recorded in
 * `data/experience.ts` — it is not per-site telemetry. `keyWork` only restates
 * work the resume already establishes; it never claims authorship of a whole
 * platform where the resume only supports contributing to it. `features` is
 * left empty on purpose.
 *
 * Screenshots live in `public/images/projects/` as 16:9 WebP (captured at
 * 1440x810, stored at 1200px wide). Omit `image` and the card falls back to a
 * generated gradient cover.
 */

export const projects: ProjectItem[] = [
  {
    id: "webcodelive",
    name: "WebCodeLive",
    category: "Web Platform & Developer Tools",
    description:
      "A production web platform and suite of website-audit tools covering SEO, performance, accessibility, and local search — built for teams who need to measure and improve site quality at scale.",
    role: "Lead Full Stack Developer",
    keyWork: [
      "Led development and maintenance of the platform end to end, from architecture through deployment.",
      "Built reusable React and Next.js components and full-stack features in TypeScript.",
      "Implemented third-party API integrations with error handling and performance safeguards.",
      "Drove SEO, Core Web Vitals, accessibility, and page-speed improvements across the product.",
      "Modernized legacy implementations through refactoring and architectural change.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "REST APIs"],
    features: [],
    demo: "https://webcodelive.com/",
    image: "/images/projects/webcodelive.webp",
  },
  {
    id: "polaris-transportation-group",
    name: "Polaris Transportation Group",
    category: "Transportation & Logistics",
    description:
      "A cross-border transportation and logistics platform serving Canadian and U.S. markets, with content, service, and business data integrated across the site.",
    role: "Full Stack Developer · Palmer Marketing",
    keyWork: [
      "Developed full-stack features across the frontend, backend, and database layers.",
      "Integrated REST APIs and third-party services, including business data feeds.",
      "Contributed to a reusable component architecture for a multi-market, bilingual experience.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "REST APIs", "SQL"],
    features: [],
    demo: "https://www.polaristransport.com/en/",
    image: "/images/projects/polaris-transport.webp",
  },
  {
    id: "armour-transportation-systems",
    name: "Armour Transportation Systems",
    category: "Transportation & Logistics",
    description:
      "A large transportation website supporting multiple service divisions and locations across North America, with shared components feeding division-level content.",
    role: "Full Stack Developer · Palmer Marketing",
    keyWork: [
      "Built responsive frontend interfaces from design specifications.",
      "Developed backend and CMS functionality to manage multi-division content.",
      "Integrated third-party services and managed deployments across staging and production.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "REST APIs", "SQL"],
    features: [],
    demo: "https://armour.ca/",
    image: "/images/projects/armour.webp",
  },
  {
    id: "seaboard-transport-group",
    name: "Seaboard Transport Group",
    category: "Transportation & Logistics",
    description:
      "A digital platform for a North American transportation and logistics group providing dry and liquid bulk services, with content and service data managed through a custom CMS.",
    role: "Full Stack Developer · Palmer Marketing",
    keyWork: [
      "Developed backend services and CMS functionality for service and location content.",
      "Integrated third-party APIs for business data and service information.",
      "Optimized frontend performance, responsive behaviour, and technical SEO.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "REST APIs", "SQL"],
    features: [],
    demo: "https://seaboardtransportgroup.com/",
    image: "/images/projects/seaboard-transport-group.webp",
  },
  {
    id: "bandstra-transportation-systems",
    name: "Bandstra Transportation Systems",
    category: "Transportation & Logistics",
    description:
      "A transportation and logistics website for a Northern BC carrier serving Western Canada and cross-border North American routes.",
    role: "Full Stack Developer · Palmer Marketing",
    keyWork: [
      "Built responsive, accessible page templates and reusable components.",
      "Implemented backend content management and API integrations for service data.",
      "Handled hosting, DNS, SSL, and production deployment for the site.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "REST APIs", "SQL"],
    features: [],
    demo: "https://www.bandstra.com/",
    image: "/images/projects/bandstra.webp",
  },
  {
    id: "landpower-real-estate",
    name: "Landpower Real Estate",
    category: "Real Estate",
    description:
      "A performance-focused real estate brokerage website built around responsive design, SEO, and user experience — alongside the custom internal software supporting the brokerage.",
    role: "Digital Marketing Designer · Landpower Real Estate",
    keyWork: [
      "Designed and developed the company website with a focus on performance and SEO.",
      "Built custom internal software, including a property management system covering properties, equipment, maintenance, and personnel.",
      "Created an internal graphic design platform with reusable templates for marketing materials and business documents.",
    ],
    technologies: ["Web Development", "Custom Software", "SEO", "Responsive Design"],
    features: [],
    demo: "https://www.landpower.ca/",
    image: "/images/projects/landpower.webp",
  },
  {
    id: "canada-computers",
    name: "Canada Computers & Electronics",
    category: "Retail & E-commerce",
    description:
      "A large-scale e-commerce platform for a Canadian computer and electronics retailer, supporting online purchasing and in-store pickup across a national store network.",
    role: "Web Designer · Canada Computers",
    keyWork: [
      "Developed new functionality and pages for a high-traffic e-commerce platform.",
      "Built new e-commerce features, improving the online purchasing experience.",
      "Maintained and optimized existing functionality, resolving bugs and improving site reliability.",
    ],
    technologies: ["E-commerce", "Web Development", "JavaScript", "HTML5", "CSS3"],
    features: [],
    demo: "https://www.canadacomputers.com/en/",
    image: "/images/projects/canada-computers.webp",
  },
  {
    id: "greenpark-group",
    name: "Greenpark Group",
    category: "Real Estate",
    description:
      "A homebuilder website showcasing townhomes, singles, and condos across the Greater Toronto Area, with community and floor-plan content managed through WordPress.",
    role: "Web and Video Designer · Impact North",
    keyWork: [
      "Developed responsive frontend templates in HTML, CSS, PHP, and jQuery on WordPress.",
      "Implemented custom website functionality and maintained the site through its production lifecycle.",
      "Converted architectural sketches and floor plans into digital illustrations for the site.",
    ],
    technologies: ["HTML5", "CSS3", "PHP", "jQuery", "WordPress"],
    features: [],
    demo: "https://greenparkgroup.ca/",
    image: "/images/projects/greenpark-group.webp",
  },
  {
    id: "starlane-home-corporation",
    name: "Starlane Home Corporation",
    category: "Real Estate",
    description:
      "A new-home website for a family-run GTA homebuilder with more than 12,500 homes built and sold, covering community listings and home designs.",
    role: "Web and Video Designer · Impact North",
    keyWork: [
      "Developed responsive frontend templates and custom WordPress functionality.",
      "Maintained the site and its content throughout the production lifecycle.",
      "Produced video and digital assets for the builder's marketing.",
    ],
    technologies: ["HTML5", "CSS3", "PHP", "jQuery", "WordPress"],
    features: [],
    demo: "https://starlanehomecorp.ca/",
    image: "/images/projects/starlane-home-corp.webp",
  },
  {
    id: "treasure-hill",
    name: "Treasure Hill",
    category: "Real Estate",
    description:
      "A community showcase website for an award-winning Ontario homebuilder, presenting new-home communities and designs to prospective buyers.",
    role: "Web and Video Designer · Impact North",
    keyWork: [
      "Developed responsive frontend templates and custom website functionality on WordPress.",
      "Maintained client sites throughout their production lifecycle.",
      "Produced supporting video, motion graphics, and digital marketing assets.",
    ],
    technologies: ["HTML5", "CSS3", "PHP", "jQuery", "WordPress"],
    features: [],
    demo: "https://www.treasurehill.com/",
    image: "/images/projects/treasure-hill.webp",
  },
];
