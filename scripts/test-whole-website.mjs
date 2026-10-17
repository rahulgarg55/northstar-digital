// Comprehensive End-to-End Website Audit & Health Test
import http from "node:http";

function fetchRoute(path, method = "GET", body = null, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path,
      method,
      headers: {
        "User-Agent": "WholeWebsiteTester/1.0",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...extraHeaders,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(typeof body === "string" ? body : JSON.stringify(body));
    req.end();
  });
}

// All 34 standard routes
const allPages = [
  // Root & Marketing
  "/",
  "/services",
  "/work",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",

  // Services (11)
  "/services/web-development",
  "/services/mern-applications",
  "/services/ecommerce",
  "/services/mobile-apps",
  "/services/saas-products",
  "/services/ui-ux-design",
  "/services/seo",
  "/services/content-writing",
  "/services/digital-marketing",
  "/services/api-integrations",
  "/services/custom-software",

  // Selected Work (5)
  "/work/bug-tracker",
  "/work/report-iq",
  "/work/aetherdesk",
  "/work/productivity-tracker",
  "/work/ecommerce-storefront",

  // Technical Articles (6)
  "/blog/building-multi-tenant-saas-architecture-nextjs-typescript",
  "/blog/privacy-first-employee-monitoring-telemetry",
  "/blog/optimizing-react-server-components-core-web-vitals",
  "/blog/securing-modern-rest-apis-rate-limiting-tokens",
  "/blog/building-ai-assisted-reporting-pipelines",
  "/blog/zero-trust-cloud-architecture-microservices",
];

const topicTagsToTest = [
  "API Security",
  "OAuth",
  "Rate Limiting",
  "Node.js",
  "FastAPI",
  "Next.js",
  "Multi-Tenant",
  "TypeScript",
  "PostgreSQL",
  "Prisma",
  "Telemetry",
  "GDPR",
  "Privacy",
  "Electron",
  "React",
  "Performance",
  "Core Web Vitals",
  "ReportIQ",
  "AI",
  "Zero-Trust",
  "Cloud Run",
  "Microservices",
  "mTLS",
  "NonExistentTagXYZ", // Tests empty filter fallback
];

async function runWholeWebsiteTest() {
  console.log("================================================================================");
  console.log("               NORTHSTAR DIGITAL — WHOLE WEBSITE TEST SUITE                     ");
  console.log("================================================================================\n");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const discoveredInternalLinks = new Set();

  function record(name, pass, detail = "") {
    totalTests++;
    if (pass) {
      passedTests++;
      console.log(`  ✓ [PASS] ${name}`);
    } else {
      failedTests++;
      console.error(`  ✗ [FAIL] ${name} — ${detail}`);
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 1: CRAWL ALL 34 PAGES & VERIFY INTEGRITY
  // ---------------------------------------------------------------------------
  console.log(`\n--- 1. CRAWLING ALL ${allPages.length} STATIC & DYNAMIC PAGES ---`);
  for (const pagePath of allPages) {
    try {
      const res = await fetchRoute(pagePath);
      const isXmlOrTxt = pagePath.endsWith(".xml") || pagePath.endsWith(".txt");

      record(`${pagePath} returns HTTP 200`, res.status === 200, `Got ${res.status}`);

      if (!isXmlOrTxt) {
        // Check HTML page hygiene
        const hasTitle = /<title>[^<]+<\/title>/i.test(res.body);
        record(`${pagePath} has valid <title>`, hasTitle, "Missing <title>");

        // Strip scripts to inspect visible rendered text
        const visibleBody = res.body.replace(/<script[\s\S]*?<\/script>/gi, "");
        const hasNoNullOrUndefined = !visibleBody.includes("undefined") && !visibleBody.includes("[object Object]");
        record(`${pagePath} has no raw 'undefined' or '[object Object]' in rendered UI`, hasNoNullOrUndefined, "Found raw object artifacts");

        const hasHeader = res.body.includes("agency-header") || res.body.includes("northstar");
        record(`${pagePath} renders header navigation`, hasHeader, "Missing header");

        const hasFooter = res.body.includes("agency-footer");
        record(`${pagePath} renders footer`, hasFooter, "Missing footer");

        // Extract internal links for crawler check
        const linkMatches = res.body.matchAll(/href="(\/[^"#?]*)"/g);
        for (const match of linkMatches) {
          const href = match[1];
          if (!href.startsWith("/_next") && !href.startsWith("/api")) {
            discoveredInternalLinks.add(href);
          }
        }
      }
    } catch (err) {
      record(`${pagePath} fetched successfully`, false, err.message);
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 2: BROKEN LINK VERIFICATION ON ALL DISCOVERED INTERNAL LINKS
  // ---------------------------------------------------------------------------
  console.log(`\n--- 2. BROKEN LINK VERIFICATION (${discoveredInternalLinks.size} UNIQUE LINKS) ---`);
  for (const link of discoveredInternalLinks) {
    try {
      const res = await fetchRoute(link);
      const isOk = res.status === 200 || res.status === 307 || res.status === 308;
      record(`Internal link '${link}' is valid`, isOk, `Status ${res.status}`);
    } catch (err) {
      record(`Internal link '${link}' is reachable`, false, err.message);
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 3: TOPIC FILTER ENGINE & INTERACTIVE TAGS
  // ---------------------------------------------------------------------------
  console.log(`\n--- 3. TESTING ${topicTagsToTest.length} INTERACTIVE TOPIC FILTERS ---`);
  for (const tag of topicTagsToTest) {
    try {
      const encodedTag = encodeURIComponent(tag);
      const res = await fetchRoute(`/blog?tag=${encodedTag}`);
      record(`Filter /blog?tag=${tag} returns HTTP 200`, res.status === 200);

      if (tag === "NonExistentTagXYZ") {
        record(
          `Empty fallback displayed for unknown tag`,
          res.body.includes("No articles found") && res.body.includes("View all articles")
        );
      } else {
        record(
          `Active topic indicator shows '${tag}'`,
          res.body.includes(tag) && res.body.includes("Active Topic Filter")
        );
        record(`Clear filter button available for '${tag}'`, res.body.includes("Clear filter"));
      }
    } catch (err) {
      record(`Filter for '${tag}' executed`, false, err.message);
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 4: INQUIRIES API COMPLIANCE & RATE LIMITING SECURITY
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. INQUIRIES API SECURITY & VALIDATION AUDIT ---");
  // 4a. Reject Empty Payload
  const emptyRes = await fetchRoute("/api/agency/inquiries", "POST", {}, { "x-forwarded-for": "10.0.1.1" });
  record("API rejects empty body with HTTP 400", emptyRes.status === 400);

  // 4b. Reject Invalid Email
  const badEmailRes = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Tester",
    email: "not-an-email",
    message: "Valid test message for validation check.",
  }, { "x-forwarded-for": "10.0.1.2" });
  record("API rejects invalid email format with HTTP 400", badEmailRes.status === 400);

  // 4c. Reject Too Short Message (< 10 chars)
  const shortMsgRes = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Tester",
    email: "test@example.com",
    message: "Hi",
  }, { "x-forwarded-for": "10.0.1.3" });
  record("API rejects short message (< 10 chars) with HTTP 400", shortMsgRes.status === 400);

  // 4d. Honeypot Silent Bot Trap
  const honeypotRes = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "SpamBot",
    email: "spambot@marketing-spam.com",
    message: "Check out our cheap SEO backlink packages now!",
    website: "https://spamdomain.xyz",
  }, { "x-forwarded-for": "10.0.1.4" });
  record("API traps honeypot bot with silent HTTP 201", honeypotRes.status === 201);

  // 4e. Reject Malformed JSON
  const badJsonRes = await fetchRoute("/api/agency/inquiries", "POST", "{ invalid json ", { "x-forwarded-for": "10.0.1.5" });
  record("API rejects malformed JSON with HTTP 400", badJsonRes.status === 400);

  // 4f. Reject Oversized Payload (> 16KB)
  const hugeMessage = "A".repeat(17000);
  const oversizedRes = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Oversized Tester",
    email: "test@example.com",
    message: hugeMessage,
  }, { "x-forwarded-for": "10.0.1.6" });
  record("API rejects oversized payload (>16KB) with HTTP 413", oversizedRes.status === 413);

  // 4g. Legitimate Payload Handling
  const validRes = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Rahul Garg Enterprise Client",
    email: "client@enterprise-client.com",
    company: "Enterprise Corp",
    service: "SaaS products",
    budget: "$10,000+",
    message: "We need an architectural review for our multi-tenant SaaS application.",
  }, { "x-forwarded-for": "10.0.1.7" });
  record(
    "API handles valid inquiry gracefully (HTTP 201 sent or 503 unconfigured fallback)",
    validRes.status === 201 || validRes.status === 503
  );

  // 4h. Edge Rate Limiter Active Defense Check (> 5 requests from same IP)
  const rateLimitIp = "192.168.100.99";
  let triggered429 = false;
  for (let i = 0; i < 7; i++) {
    const rlRes = await fetchRoute("/api/agency/inquiries", "POST", {
      name: `Spam Tester ${i}`,
      email: `spam${i}@test.com`,
      message: "Repeated inquiry to trigger rate limiter.",
    }, { "x-forwarded-for": rateLimitIp });
    if (rlRes.status === 429) {
      triggered429 = true;
      break;
    }
  }
  // 4i. Production Health & Telemetry Verification
  const healthRes = await fetchRoute("/api/health");
  record("Health check /api/health returns HTTP 200", healthRes.status === 200);
  try {
    const healthJson = JSON.parse(healthRes.body);
    record("Health response includes status 'healthy'", healthJson.status === "healthy");
    record("Health response reports services UP", healthJson.services?.website === "UP" && healthJson.services?.inquiriesApi === "UP");
  } catch {
    record("Health response is valid JSON", false);
  }

  // ---------------------------------------------------------------------------
  // SECTION 5: ACCESSIBILITY, CONTRAST & THEME INTEGRITY
  // ---------------------------------------------------------------------------
  console.log("\n--- 5. ACCESSIBILITY & CONTRAST INTEGRITY ---");
  const homeRes = await fetchRoute("/");
  record("Homepage sets suppressHydrationWarning on <html>", homeRes.body.includes("suppressHydrationWarning"));
  record("Homepage contains anti-FOUC script for instant theme sync", homeRes.body.includes("northstar_theme"));
  record("Homepage contains ThemeToggle component", homeRes.body.includes("agency-theme-btn"));

  const privacyRes = await fetchRoute("/privacy");
  record("Privacy page includes GDPR reference", privacyRes.body.includes("GDPR"));
  record("Privacy page includes CCPA reference", privacyRes.body.includes("CCPA"));

  const termsRes = await fetchRoute("/terms");
  record("Terms page includes Intellectual Property clause", termsRes.body.includes("Intellectual Property Rights"));

  const articleDetail = await fetchRoute("/blog/securing-modern-rest-apis-rate-limiting-tokens");
  record("Article page links to API Security tag", articleDetail.body.includes('href="/blog?tag=API%20Security"'));
  record("Article page links to OAuth tag", articleDetail.body.includes('href="/blog?tag=OAuth"'));
  record("Article page links to Rate Limiting tag", articleDetail.body.includes('href="/blog?tag=Rate%20Limiting"'));
  record("Article page links to Node.js tag", articleDetail.body.includes('href="/blog?tag=Node.js"'));
  record("Article page links to FastAPI tag", articleDetail.body.includes('href="/blog?tag=FastAPI"'));

  console.log("\n================================================================================");
  console.log(`WHOLE WEBSITE AUDIT SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
  console.log("================================================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runWholeWebsiteTest().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
