export interface DemoChapter {
  time: string;
  seconds: number;
  title: string;
  pageName: string;
  pageUrl: string;
  description: string;
  screenType: string;
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
      title: "BugTracker — Complete Website & Product Walkthrough",
      badge: "Full Website Walkthrough",
      duration: "3:20",
      totalSeconds: 200,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Sign-In & Multi-Tenant Onboarding",
          pageName: "Authentication Portal",
          pageUrl: "http://localhost:3001/login",
          description: "Google OAuth, GitHub SSO, and credentials login with light/dark theme toggle.",
          screenType: "login",
        },
        {
          time: "0:45",
          seconds: 45,
          title: "Organization Workspace & Project Overview",
          pageName: "Workspace Switcher",
          pageUrl: "http://localhost:3001/org/northstar",
          description: "Instant switching between isolated client organization workspaces with role-based access control.",
          screenType: "workspace",
        },
        {
          time: "1:30",
          seconds: 90,
          title: "Interactive Sprint Kanban Board",
          pageName: "Sprint 42 Board",
          pageUrl: "http://localhost:3001/sprints/active",
          description: "Drag-and-drop ticket state transitions across Backlog, In Progress, In Review, and Done columns.",
          screenType: "kanban",
        },
        {
          time: "2:15",
          seconds: 135,
          title: "Rich Markdown Issue Editor & Task Lifecycle",
          pageName: "Issue Editor (#BT-104)",
          pageUrl: "http://localhost:3001/issues/BT-104",
          description: "Full markdown editor, reproduction steps, code snippet attachments, and priority labels.",
          screenType: "editor",
        },
        {
          time: "2:50",
          seconds: 170,
          title: "Milestone Releases & Automated Changelogs",
          pageName: "Releases & Changelogs",
          pageUrl: "http://localhost:3001/releases/v2.4.0",
          description: "Version release tagging, milestone burndown analytics, and GitHub repo synchronization.",
          screenType: "releases",
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
      title: "ReportIQ — Complete Website & Product Walkthrough",
      badge: "Full Website Walkthrough",
      duration: "3:10",
      totalSeconds: 190,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Agency Landing Page & Value Proposition",
          pageName: "Studio Landing",
          pageUrl: "http://localhost:3002/",
          description: "Overview of automated client reporting, source integrations, and whitelabel templates.",
          screenType: "landing",
        },
        {
          time: "0:40",
          seconds: 40,
          title: "Data Connectors & Telemetry Ingestion Hub",
          pageName: "Integrations & Sources",
          pageUrl: "http://localhost:3002/integrations",
          description: "Connecting Google Analytics 4, Clockify time sheets, and developer hours via webhooks.",
          screenType: "integrations",
        },
        {
          time: "1:25",
          seconds: 85,
          title: "Generative AI Executive Narrative Generator",
          pageName: "AI Summary Engine",
          pageUrl: "http://localhost:3002/ai-summary",
          description: "Synthesizing raw traffic anomalies, conversion spikes, and progress milestones into client narratives.",
          screenType: "ai-summary",
        },
        {
          time: "2:05",
          seconds: 125,
          title: "Custom Branded PDF Previewer & Template Editor",
          pageName: "Report Previewer",
          pageUrl: "http://localhost:3002/reports/preview",
          description: "Whitelabel React-rendered PDF exports with agency logos, custom fonts, and KPI cards.",
          screenType: "pdf",
        },
        {
          time: "2:40",
          seconds: 160,
          title: "Automated Recurring Email Dispatch Cron",
          pageName: "Delivery Scheduler",
          pageUrl: "http://localhost:3002/schedules",
          description: "Automated monthly dispatch to client executives with encrypted delivery verification.",
          screenType: "schedules",
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
      title: "AetherDesk Tracker — Complete Website & Product Walkthrough",
      badge: "Full Website Walkthrough",
      duration: "3:30",
      totalSeconds: 210,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Employee Consent & Onboarding Portal",
          pageName: "Onboarding & Consent",
          pageUrl: "http://localhost:5173/",
          description: "Transparent employee disclosure and system tray agent status setup under GDPR Art. 6.",
          screenType: "onboarding",
        },
        {
          time: "0:45",
          seconds: 45,
          title: "Live Activity & Productivity Dashboard",
          pageName: "Live Telemetry Dashboard",
          pageUrl: "http://localhost:5173/dashboard",
          description: "Real-time active window timeline, productivity score breakdown, and idle detection.",
          screenType: "dashboard",
        },
        {
          time: "1:30",
          seconds: 90,
          title: "Screenshot Gallery with Automated Privacy Masking",
          pageName: "Privacy Mask Gallery",
          pageUrl: "http://localhost:5173/screenshots",
          description: "Automatic Gaussian blur masking over password fields and banking screens before cloud sync.",
          screenType: "screenshots",
        },
        {
          time: "2:15",
          seconds: 135,
          title: "Organization Workspaces & Multi-Tenant Access",
          pageName: "Organization Settings",
          pageUrl: "http://localhost:5173/settings/org",
          description: "Seat management, role-based access policies (Admin, Lead, Employee), and tenant isolation.",
          screenType: "organizations",
        },
        {
          time: "2:55",
          seconds: 175,
          title: "Security, Encryption & GDPR Compliance Center",
          pageName: "Compliance Center",
          pageUrl: "http://localhost:5173/compliance",
          description: "Local AES-256-GCM encryption verification, retention policies, and self-service erasure requests.",
          screenType: "compliance",
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
      title: "Productivity Intelligence Tracker — Complete Website & Product Walkthrough",
      badge: "Full Website Walkthrough",
      duration: "2:40",
      totalSeconds: 160,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Real-Time Telemetry Dashboard",
          pageName: "Live Focus Dashboard",
          pageUrl: "http://localhost:8000/",
          description: "Circular focus score gauge, active window indicator (VS Code), and deep work status.",
          screenType: "dashboard",
        },
        {
          time: "0:40",
          seconds: 40,
          title: "Application Classification & Time Breakdown",
          pageName: "App Categorization",
          pageUrl: "http://localhost:8000/#breakdown",
          description: "Visual breakdown of developer apps: VS Code (64%), Terminal (21%), Chrome Research (15%).",
          screenType: "breakdown",
        },
        {
          time: "1:20",
          seconds: 80,
          title: "Historical Focus Trends & Session Velocity",
          pageName: "Session Analytics",
          pageUrl: "http://localhost:8000/#analytics",
          description: "Rolling mathematical focus curves, productive burst intervals, and daily averages.",
          screenType: "analytics",
        },
        {
          time: "2:00",
          seconds: 120,
          title: "Interactive OpenAPI Swagger Documentation",
          pageName: "REST API Swagger Docs",
          pageUrl: "http://localhost:8000/docs",
          description: "Executing live authenticated /api/stats endpoints and JSON payload verification.",
          screenType: "api",
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
      title: "E-Commerce Storefront — Complete Website & Product Walkthrough",
      badge: "Full Website Walkthrough",
      duration: "2:30",
      totalSeconds: 150,
      chapters: [
        {
          time: "0:00",
          seconds: 0,
          title: "Storefront Catalog & Featured Collections",
          pageName: "Storefront Home",
          pageUrl: "https://rahulgarg55.github.io/Ecommerce-Website-Clone/",
          description: "Hero promotion banners, new arrivals grid, and category navigation bars.",
          screenType: "catalog",
        },
        {
          time: "0:40",
          seconds: 40,
          title: "Faceted Search & Price Range Filters",
          pageName: "Category Search",
          pageUrl: "https://rahulgarg55.github.io/Ecommerce-Website-Clone/#filter",
          description: "Dynamic product filtering by price slider, customer ratings, and brand checkboxes.",
          screenType: "filter",
        },
        {
          time: "1:20",
          seconds: 80,
          title: "Product Detail View & Variant Selector",
          pageName: "Product Detail View",
          pageUrl: "https://rahulgarg55.github.io/Ecommerce-Website-Clone/#detail",
          description: "Interactive image gallery, color/size variant selection, and live inventory counter.",
          screenType: "detail",
        },
        {
          time: "1:55",
          seconds: 115,
          title: "Shopping Cart State & Checkout Simulation",
          pageName: "Cart & Checkout Review",
          pageUrl: "https://rahulgarg55.github.io/Ecommerce-Website-Clone/#cart",
          description: "Slide-over cart drawer, discount coupon calculations, and checkout confirmation flow.",
          screenType: "cart",
        },
      ],
    },
  },
] as const;
