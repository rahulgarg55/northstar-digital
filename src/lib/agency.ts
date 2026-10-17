export interface DemoChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
}

export interface DemoVideoInfo {
  title: string;
  badge: string;
  duration: string;
  totalSeconds: number;
  chapters: DemoChapter[];
}

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

export const selectedProjects = [
  {
    slug: "bug-tracker",
    name: "BugTracker",
    mark: "BT",
    type: "In-house SaaS product",
    liveStatusLabel: "Live product",
    headline: "Engineering work, in sync.",
    description:
      "An engineering workspace for managing issues, projects, sprints, and releases.",
    detail:
      "BugTracker brings issue tracking, project work, sprint planning, and release workflows together in a multi-tenant workspace.",
    liveUrl: "https://bug-tracker-ochre-tau.vercel.app/login",
    liveLinkLabel: "Open BugTracker",
    capabilities: [
      "Issue tracking and project workflows",
      "Sprint planning and release management",
      "Organization workspaces and role-based access",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma"],
    sourceUrl: "https://github.com/rahulgarg55/bug-tracker",
    demoVideo: {
      title: "BugTracker — Multi-Tenant Issue Tracking & Sprint Board Walkthrough",
      badge: "SaaS Product Walkthrough",
      duration: "3:15",
      totalSeconds: 195,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Multi-Tenant Workspace & Org Switching",
          description: "Instant switching between isolated client organization workspaces with role-based access control.",
        },
        {
          time: "0:45",
          seconds: 45,
          title: "Interactive Sprint Kanban Boards",
          description: "Real-time ticket drag-and-drop, priority scoring, assignee tagging, and sprint velocity tracking.",
        },
        {
          time: "1:30",
          seconds: 90,
          title: "Issue Lifecycle & Markdown Editor",
          description: "Full rich-text issue creation, reproduction steps, code snippet attachments, and label filters.",
        },
        {
          time: "2:20",
          seconds: 140,
          title: "Releases & Automated Changelogs",
          description: "Tagging version releases, milestone burndown analytics, and GitHub sync verification.",
        },
      ],
    },
  },
  {
    slug: "report-iq",
    name: "ReportIQ",
    mark: "RI",
    type: "In-house reporting product",
    liveStatusLabel: "Live product",
    headline: "Client reporting, less manual.",
    description:
      "An AI-assisted client reporting product presented for agencies and their reporting workflows.",
    detail:
      "ReportIQ's public site describes a reporting workflow that brings together Google Analytics and time-tracking data, with AI-written summaries, branded reports, and scheduled delivery.",
    liveUrl: "https://report-iq-topaz.vercel.app/",
    liveLinkLabel: "Explore ReportIQ",
    capabilities: [
      "Google Analytics and time-tracking data for client reports",
      "AI-written summaries and branded PDF exports",
      "Scheduled delivery and shareable web reports",
    ],
    stack: ["NestJS", "Next.js", "TypeScript", "Tailwind CSS"],
    sourceUrl: "https://github.com/rahulgarg55/ReportIQ",
    demoVideo: {
      title: "ReportIQ — AI-Assisted Agency Client Reporting Demo",
      badge: "AI Reporting Demo",
      duration: "2:50",
      totalSeconds: 170,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Multi-Channel Ingestion (GA4 & Time Tracking)",
          description: "Seamless webhook syncing with Google Analytics 4, developer hours, and client retainers.",
        },
        {
          time: "0:40",
          seconds: 40,
          title: "Generative AI Executive Summaries",
          description: "Synthesizing raw traffic anomalies, conversion spikes, and progress milestones into clear narratives.",
        },
        {
          time: "1:35",
          seconds: 95,
          title: "Custom Branded PDF Generation",
          description: "Dynamic React-rendered print-ready PDFs with custom agency logos, brand colors, and metrics.",
        },
        {
          time: "2:15",
          seconds: 135,
          title: "Automated Scheduled Email Cron",
          description: "Automated recurring dispatch to client executives with encrypted delivery verification.",
        },
      ],
    },
  },
  {
    slug: "aetherdesk",
    name: "AetherDesk Tracker",
    mark: "AD",
    type: "Workforce Telemetry & Desktop SaaS",
    liveStatusLabel: "Live platform",
    headline: "Workforce telemetry, privacy-first.",
    description:
      "An enterprise desktop monitoring and workforce productivity intelligence platform with offline telemetry sync, encryption, and tenant isolation.",
    detail:
      "AetherDesk delivers enterprise desktop monitoring, real-time activity tracking, automated screenshot telemetry with privacy masking, multi-tenant organization workspaces, and granular compliance controls.",
    liveUrl: "http://localhost:5173",
    liveLinkLabel: "Explore AetherDesk",
    capabilities: [
      "Cross-platform desktop monitoring and telemetry",
      "Multi-tenant organization workspaces and role-based access",
      "Offline activity queue with cryptographic event sync",
      "Privacy masking and employee consent compliance controls",
    ],
    stack: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Vite", "Electron"],
    sourceUrl: "https://github.com/rahulgarg55/aetherdesk",
    demoVideo: {
      title: "AetherDesk Tracker — Enterprise Desktop Telemetry & Privacy Controls",
      badge: "Architecture & Telemetry Demo",
      duration: "3:40",
      totalSeconds: 220,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Cross-Platform Agent & System Tray Indicator",
          description: "Lightweight Electron background daemon with transparent employee status tray indicator.",
        },
        {
          time: "0:55",
          seconds: 55,
          title: "Active Window Polling & Classification",
          description: "Real-time application categorization into productive, neutral, and distracting work states.",
        },
        {
          time: "1:45",
          seconds: 105,
          title: "Configurable Privacy Masking & Sensitive Blurring",
          description: "Automatic visual blurring of passwords and sensitive screens in compliance with GDPR Art. 6.",
        },
        {
          time: "2:50",
          seconds: 170,
          title: "Offline Telemetry Queue & Cryptographic Sync",
          description: "Local AES-256-GCM encryption buffer with reliable batch transmission upon network restore.",
        },
      ],
    },
  },
  {
    slug: "productivity-tracker",
    name: "Productivity Intelligence Tracker",
    mark: "PT",
    type: "Telemetry Analytics & Scoring Engine",
    liveStatusLabel: "Live engine",
    headline: "Automated work session scoring.",
    description:
      "A lightweight Python-based productivity telemetry engine with automated application classification, focus scoring, and live dashboards.",
    detail:
      "Productivity Tracker captures active window telemetry, categorizes desktop workflows into productive, distracted, or idle states, and computes real-time productivity scores with REST APIs.",
    liveUrl: "http://localhost:8000",
    liveLinkLabel: "Open Productivity Dashboard",
    capabilities: [
      "Real-time application activity telemetry",
      "Automated productive vs. distracted classification",
      "Instant focus score aggregation and analytics",
      "RESTful telemetry APIs with Bearer token authentication",
    ],
    stack: ["Python", "FastAPI", "SQLite", "Uvicorn", "Tailwind CSS"],
    sourceUrl: "https://github.com/rahulgarg55/productivity-tracker",
    demoVideo: {
      title: "Productivity Intelligence Tracker — Python Scoring Engine & Live API",
      badge: "FastAPI Engine Demo",
      duration: "2:20",
      totalSeconds: 140,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Active Window Polling Engine",
          description: "FastAPI native background daemon polling desktop state without CPU overhead (<0.5% usage).",
        },
        {
          time: "0:35",
          seconds: 35,
          title: "Rolling Focus Score Algorithm",
          description: "Dynamic mathematical weighted scoring aggregating productive versus distracted intervals.",
        },
        {
          time: "1:15",
          seconds: 75,
          title: "Live Metrics Dashboard Stream",
          description: "Real-time web dashboard displaying session duration, top productive apps, and idle ratios.",
        },
        {
          time: "1:50",
          seconds: 110,
          title: "RESTful Bearer Token Endpoints & Swagger",
          description: "Secure data extraction APIs for external BI dashboards with OpenAPI specification.",
        },
      ],
    },
  },
  {
    slug: "ecommerce-storefront",
    name: "E-commerce storefront",
    mark: "EC",
    type: "Portfolio demo",
    liveStatusLabel: "Live demo",
    headline: "A storefront, ready to browse.",
    description:
      "A Bootstrap-based storefront demo with product listings, detail pages, and a shopping cart.",
    detail:
      "This e-commerce demo presents a browsable storefront, with separate pages for product listings, product details, and a cart.",
    liveUrl: "https://rahulgarg55.github.io/Ecommerce-Website-Clone/",
    liveLinkLabel: "Open storefront demo",
    capabilities: [
      "Storefront homepage and product listings",
      "Product detail and cart pages",
      "Responsive storefront interface",
    ],
    stack: ["Bootstrap", "HTML", "CSS"],
    sourceUrl: "https://github.com/rahulgarg55/Ecommerce-Website-Clone",
    demoVideo: {
      title: "Modern Storefront — Catalog, Filtering & Shopping Cart Walkthrough",
      badge: "E-Commerce Demo",
      duration: "2:10",
      totalSeconds: 130,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Catalog Grid & Category Navigation",
          description: "Fluid responsive product grid with dynamic price and category filtering.",
        },
        {
          time: "0:45",
          seconds: 45,
          title: "Product Detail & Variant Selector",
          description: "Interactive image gallery, variant switching, and inventory status indicators.",
        },
        {
          time: "1:20",
          seconds: 80,
          title: "Cart State & Checkout Simulation",
          description: "Persistent shopping cart calculations, discount coupon application, and order review.",
        },
      ],
    },
  },
] as const;
