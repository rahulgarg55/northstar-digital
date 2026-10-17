/**
 * Northstar Digital Studio — Automated Daily Tech Article Engine
 *
 * This script runs daily via GitHub Actions cron or local schedule.
 * It selects or generates a new in-depth technical article, updates
 * src/lib/articles.ts, and ensures high SEO compliance.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTICLES_FILE = path.resolve(__dirname, "../src/lib/articles.ts");

const ARTICLE_TOPICS_POOL = [
  {
    slug: "zero-trust-cloud-architecture-microservices",
    title: "Implementing Zero-Trust Architecture across Microservices and Cloud Run",
    description: "Architectural strategies for continuous verification, identity-aware proxies, and encrypted inter-service communication.",
    category: "Cybersecurity",
    readTime: "7 min read",
    tags: ["Zero-Trust", "Cloud Run", "Microservices", "mTLS", "IAM"],
    content: `
### The Demise of the Perimeter Security Model

Traditional network security assumed that everything within a corporate VPC was trustworthy. In distributed cloud environments, this perimeter model is completely obsolete.

### Core Tenets of Zero-Trust

1. **Verify Explicitly:** Every request must authenticate and authorize against strict identity context, regardless of origin.
2. **Use Least-Privilege Access:** Limit user and service account permissions to precisely what is required for the immediate transaction.
3. **Assume Breach:** Design architecture assuming an attacker has already bypassed the outer gateway.

\`\`\`typescript
// Service-to-service mTLS & JWT token verification middleware
export async function verifyServiceToken(token: string, requiredAudience: string) {
  const payload = await verifyJwtWithOidc(token);
  if (payload.aud !== requiredAudience) {
    throw new Error("Unauthorized: Invalid audience for service communication");
  }
  return payload;
}
\`\`\`

### Architectural Takeaways

Deploy mutual TLS (mTLS) with automated certificate rotation via Cloud Service Mesh. Never transmit unencrypted telemetry across internal service boundaries.
`,
  },
  {
    slug: "edge-database-synchronization-sqlite-turso",
    title: "Edge Database Synchronization: High-Velocity Global Reads with Embedded Replicas",
    description: "How embedded SQLite replicas and edge databases cut global API read latencies from 350ms to sub-15ms.",
    category: "Architecture",
    readTime: "6 min read",
    tags: ["SQLite", "Turso", "Edge Computing", "Database Sharding", "Latency"],
    content: `
### Latency in Global User Experiences

When users in Tokyo access a PostgreSQL database located in Virginia (us-east-1), the speed of light imposes a minimum 180ms round-trip network penalty before any query execution begins.

### The Embedded Replica Paradigm

By embedding SQLite replicas directly into edge compute runtimes:

- Read queries execute in-memory with sub-5ms response times.
- Writes stream upstream to a primary ledger with automatic conflict resolution.
- Edge workers serve user requests from local memory caches without cross-continental egress costs.

\`\`\`typescript
// Edge client initialization with local replica synchronization
import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
  syncUrl: process.env.SYNC_URL,
});
\`\`\`

### Production Takeaway

Ideal for read-heavy workforce intelligence dashboards, public documentation platforms, and product catalogs where 95% of database operations are queries.
`,
  },
  {
    slug: "webassembly-high-performance-browser-telemetry",
    title: "Accelerating Browser & Desktop Telemetry with Rust and WebAssembly (Wasm)",
    description: "Compiling native Rust algorithms to WebAssembly for client-side cryptographic hashing, privacy blurring, and audio-visual processing.",
    category: "Engineering",
    readTime: "8 min read",
    tags: ["WebAssembly", "Rust", "Performance", "Telemetry", "Desktop"],
    content: `
### The Limits of JavaScript in Heavy Client Telemetry

In high-frequency desktop tracking and screen processing applications like **AetherDesk Tracker**, performing real-time image hashing and privacy masking in pure JavaScript causes event loop starvation and UI frame drops.

### Offloading to Rust via WebAssembly

Compiling memory-safe Rust to Wasm bytecode yields:

- **Near-Native Execution Speed:** Fast pixel scanning for on-screen sensitive data detection.
- **Constant Memory Footprint:** Zero garbage collection pauses impacting client productivity.
- **Cross-Platform Portability:** The identical Wasm binary runs seamlessly in Chrome, Safari, Electron, and Tauri.

\`\`\`rust
// Rust privacy masking kernel compiled to Wasm
#[wasm_bindgen]
pub fn mask_sensitive_screen_regions(buffer: &mut [u8], width: u32, height: u32) {
    // Scan pixel brightness and blur high-frequency text zones
    for chunk in buffer.chunks_exact_mut(4) {
        if is_sensitive_region(chunk) {
            chunk[0] = 0; // Mask Red
            chunk[1] = 0; // Mask Green
            chunk[2] = 0; // Mask Blue
        }
    }
}
\`\`\`
`,
  },
];

async function run() {
  console.log("Reading existing articles from:", ARTICLES_FILE);
  let content = fs.readFileSync(ARTICLES_FILE, "utf-8");

  // Determine which topic to add that isn't already present
  const availableTopic = ARTICLE_TOPICS_POOL.find(
    (topic) => !content.includes(`slug: "${topic.slug}"`)
  );

  if (!availableTopic) {
    console.log("All predefined pool articles are already published. Adding rotational timestamped article.");
    const dateStr = new Date().toISOString().split("T")[0];
    const newTopic = {
      slug: `modern-full-stack-engineering-trends-${dateStr}`,
      title: `Full-Stack Engineering Trends & Architectural Insights (${dateStr})`,
      description: "Daily architectural insights into cloud scalability, frontend efficiency, and enterprise software engineering.",
      category: "Engineering",
      readTime: "5 min read",
      tags: ["Full-Stack", "Architecture", "Cloud", "Next.js"],
      content: `
### Daily Technical Insight for ${dateStr}

Enterprise engineering demands continuous evaluation of technical debt, CI/CD pipeline acceleration, and deterministic builds.

- Standardize monorepo workspaces with Turborepo or Nx.
- Enforce strict typing across frontend and backend boundaries using shared tRPC or generated OpenAPI schemas.
- Profile serverless cold starts and implement pre-warmed connection pools to PostgreSQL or MongoDB clusters.
`,
    };
    appendArticle(content, newTopic);
    return;
  }

  console.log(`Publishing new daily article: "${availableTopic.title}"...`);
  appendArticle(content, availableTopic);
}

function appendArticle(fileContent, article) {
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const safeContent = article.content.trim().replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");
  const articleSnippet = `  {
    slug: "${article.slug}",
    title: "${article.title.replace(/"/g, '\\"')}",
    description: "${article.description.replace(/"/g, '\\"')}",
    category: "${article.category}",
    publishedAt: "${todayFormatted}",
    readTime: "${article.readTime}",
    author: {
      name: "Rahul Garg",
      role: "Founder & Lead Architect, Northstar Digital",
    },
    tags: ${JSON.stringify(article.tags)},
    content: \`${safeContent}\`,
  },
];`;

  const updatedContent = fileContent.replace(/,?\s*\];\s*$/, `,\n${articleSnippet}\n`);
  fs.writeFileSync(ARTICLES_FILE, updatedContent, "utf-8");
  console.log(`Successfully published "${article.title}" to ${ARTICLES_FILE}!`);
}

run().catch((err) => {
  console.error("Error generating daily article:", err);
  process.exit(1);
});
