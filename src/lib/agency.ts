export const agencyServices = [
  {
    slug: "web-development",
    title: "Website development",
    category: "Web",
    description:
      "Fast, accessible websites built around your customers, your content, and the next step you want them to take.",
    detail:
      "From a focused marketing site to a larger content-rich experience, we plan the structure, design the interface, and build for real-world performance.",
    deliverables: ["Responsive design", "Accessible components", "SEO-ready structure"],
  },
  {
    slug: "mern-applications",
    title: "MERN stack applications",
    category: "Applications",
    description:
      "Full-stack MongoDB, Express, React, and Node.js applications shaped around your product requirements.",
    detail:
      "We build maintainable application foundations with clear data models, dependable APIs, and interfaces your team can confidently extend.",
    deliverables: ["Product architecture", "Full-stack implementation", "Deployment guidance"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    category: "Commerce",
    description:
      "Thoughtful storefronts that make browsing, buying, and managing products feel effortless.",
    detail:
      "We connect catalog, checkout, and operational workflows into a commerce experience designed for your customers and the people running the business.",
    deliverables: ["Storefront UX", "Catalog and checkout", "Commerce integrations"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    category: "Applications",
    description:
      "Useful iOS and Android experiences designed to feel right in the hands of your customers.",
    detail:
      "We take mobile ideas from early flows to polished, production-minded applications, with a focus on clarity, reliability, and the realities of device use.",
    deliverables: ["Mobile product design", "iOS and Android development", "API integration"],
  },
  {
    slug: "saas-products",
    title: "SaaS products",
    category: "Products",
    description:
      "Subscription products with the workflows, integrations, and foundations real teams need.",
    detail:
      "We help shape the core product experience—from first-run onboarding through daily workflows—while keeping security and maintainability in view.",
    deliverables: ["Product discovery", "SaaS application build", "Release-ready foundations"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX design",
    category: "Design",
    description:
      "Clear user journeys and considered interfaces that make complex products easier to use.",
    detail:
      "We turn product goals into researched flows, usable prototypes, and implementation-ready interface systems that keep teams aligned.",
    deliverables: ["User flows", "Wireframes and prototypes", "Design systems"],
  },
  {
    slug: "seo",
    title: "SEO",
    category: "Growth",
    description:
      "A stronger technical and content foundation for the people searching for what you offer.",
    detail:
      "We improve the discoverability basics that belong in your product: crawlable pages, sensible metadata, structured content, and performance.",
    deliverables: ["Technical SEO review", "On-page improvements", "Search-ready structure"],
  },
  {
    slug: "content-writing",
    title: "Content writing",
    category: "Growth",
    description:
      "Useful, well-structured copy that helps the right people understand your product.",
    detail:
      "We shape clear website and product content around your audience, keeping the language specific, useful, and consistent with your voice.",
    deliverables: ["Website copy", "Product messaging", "Content structure"],
  },
  {
    slug: "digital-marketing",
    title: "Digital marketing",
    category: "Growth",
    description:
      "Practical campaign and channel support that starts with your goals, not vanity metrics.",
    detail:
      "We help connect your offer, landing pages, and digital channels into a focused plan—with clear measurement defined before launch.",
    deliverables: ["Campaign planning", "Landing page alignment", "Measurement setup"],
  },
  {
    slug: "api-integrations",
    title: "API integrations",
    category: "Engineering",
    description:
      "The services and systems your product needs, connected with care.",
    detail:
      "We integrate third-party services and internal APIs with attention to validation, failure states, and maintainable handoffs.",
    deliverables: ["Integration planning", "API implementation", "Error-state handling"],
  },
  {
    slug: "custom-software",
    title: "Custom software",
    category: "Engineering",
    description:
      "Purpose-built software for the processes off-the-shelf products cannot quite solve.",
    detail:
      "We work with you to understand the workflow first, then deliver a software solution sized to the actual problem and your team's next steps.",
    deliverables: ["Workflow discovery", "Custom application development", "Technical handoff"],
  },
] as const;

export const featuredProject = {
  slug: "bug-tracker",
  name: "BugTracker",
  type: "In-house SaaS product",
  description:
    "An engineering management product for issue tracking, projects, sprint planning, and team workflows.",
  stack: ["Next.js", "React", "TypeScript", "Prisma"],
  capabilities: [
    "Issue tracking and project workflows",
    "Sprint planning and release management",
    "Multi-tenant workspaces and role-based access",
  ],
  sourceUrl: "https://github.com/Priyamittal-dev/bug-tracker",
} as const;
