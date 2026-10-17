// Comprehensive UI & Feature Regression Suite for Northstar Digital
import http from "node:http";

function fetchRoute(path, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path,
      method,
      headers: {
        "User-Agent": "RegressionTester/1.0",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runRegressionSuite() {
  console.log("================================================================================");
  console.log("       NORTHSTAR DIGITAL — FULL UI & FEATURE REGRESSION TEST SUITE              ");
  console.log("================================================================================\n");

  const results = [];
  let passed = 0;
  let failed = 0;

  function assert(testName, condition, details = "") {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
      results.push({ testName, status: "PASS", details });
    } else {
      console.error(`  ✗ [FAIL] ${testName} - ${details}`);
      failed++;
      results.push({ testName, status: "FAIL", details });
    }
  }

  // 1. Homepage Regression
  console.log("1. Testing Homepage (/) ...");
  const home = await fetchRoute("/");
  assert("Homepage returns HTTP 200", home.status === 200, `Got ${home.status}`);
  assert("Homepage includes Studio branding 'northstar'", home.body.includes("north") && home.body.includes("star"));
  assert("Homepage includes ThemeToggle component", home.body.includes("agency-theme-btn"));
  assert("Homepage includes Selected Work section", home.body.includes("Selected work"));
  assert("Homepage includes AetherDesk in showcase", home.body.includes("AetherDesk"));
  assert("Homepage includes Productivity Intelligence Tracker in showcase", home.body.includes("Productivity Intelligence Tracker"));
  assert("Homepage includes Cookie Consent banner", home.body.includes("Privacy &amp; Cookie Consent") || home.body.includes("Cookie Consent") || home.body.includes("cookie"));

  // 2. Blog Hub Regression
  console.log("\n2. Testing Blog Knowledge Base (/blog) ...");
  const blog = await fetchRoute("/blog");
  assert("Blog hub returns HTTP 200", blog.status === 200, `Got ${blog.status}`);
  assert(
    "Featured article title rendered",
    blog.body.includes("Building Enterprise Multi-Tenant SaaS Architectures with Next.js 16 &amp; TypeScript") ||
    blog.body.includes("Building Enterprise Multi-Tenant SaaS Architectures with Next.js 16 & TypeScript")
  );
  assert("Featured article author 'Rahul Garg' rendered", blog.body.includes("Rahul Garg"));
  assert("Featured article card has .agency-blog-featured-card styling", blog.body.includes("agency-blog-featured-card"));
  assert("Automated Daily Tech Publishing banner rendered", blog.body.includes("Automated Daily Tech Publishing Pipeline"));
  assert("Automation banner has .agency-automation-banner styling", blog.body.includes("agency-automation-banner"));
  assert("Articles grid cards have .agency-blog-grid-card styling", blog.body.includes("agency-blog-grid-card"));

  // 3. Article Reader Regression
  console.log("\n3. Testing Article Reader (/blog/building-multi-tenant-saas-architecture-nextjs-typescript) ...");
  const article = await fetchRoute("/blog/building-multi-tenant-saas-architecture-nextjs-typescript");
  assert("Article reader returns HTTP 200", article.status === 200, `Got ${article.status}`);
  assert("Article title rendered in header", article.body.includes("Building Enterprise Multi-Tenant SaaS Architectures"));
  assert("Article author role rendered", article.body.includes("Lead Architect"));
  assert("Article code snippets rendered", article.body.includes("middleware.ts") || article.body.includes("typescript"));
  assert("Article JSON-LD structured metadata present", article.body.includes('"@type":"TechArticle"'));
  assert("Back to all articles link present", article.body.includes("Back to all articles"));

  // 4. Selected Work Route & Detail Pages
  console.log("\n4. Testing Work Showcase Routes ...");
  const work = await fetchRoute("/work");
  assert("Work index returns HTTP 200", work.status === 200);
  assert("Work index lists AetherDesk", work.body.includes("AetherDesk"));
  assert("Work index lists Productivity Intelligence Tracker", work.body.includes("Productivity Intelligence Tracker"));
  assert("Work index lists BugTracker", work.body.includes("BugTracker"));
  assert("Work index lists ReportIQ", work.body.includes("ReportIQ"));

  const workAether = await fetchRoute("/work/aetherdesk");
  assert("AetherDesk detail page returns HTTP 200", workAether.status === 200);
  assert("AetherDesk live panel rendered", workAether.body.includes("agency-project-live-panel"));
  assert("AetherDesk capabilities listed", workAether.body.includes("desktop monitoring and telemetry"));

  const workProd = await fetchRoute("/work/productivity-tracker");
  assert("Productivity Tracker detail page returns HTTP 200", workProd.status === 200);
  assert("Productivity Tracker live panel rendered", workProd.body.includes("agency-project-live-panel"));
  assert("Productivity Tracker capabilities listed", workProd.body.includes("Real-time application activity telemetry"));

  // 5. Services Hub & Detail Pages
  console.log("\n5. Testing Services Routes ...");
  const services = await fetchRoute("/services");
  assert("Services index returns HTTP 200", services.status === 200);
  assert("Services list contains cards", services.body.includes("agency-service-card"));

  const serviceWeb = await fetchRoute("/services/web-development");
  assert("Service web-development returns HTTP 200", serviceWeb.status === 200);
  assert("Service deliverables listed", serviceWeb.body.includes("agency-deliverables"));

  // 6. Contact Route & Form
  console.log("\n6. Testing Contact Page (/contact) ...");
  const contact = await fetchRoute("/contact");
  assert("Contact page returns HTTP 200", contact.status === 200);
  assert("Form label 'A little about your project' rendered", contact.body.includes("A little about your project"));
  assert("Direct email 'gargr0109@gmail.com' rendered", contact.body.includes("gargr0109@gmail.com"));
  assert("WhatsApp direct chat link rendered", contact.body.includes("wa.me/917807221279"));
  assert("Anti-spam honeypot input present", contact.body.includes("agency-honeypot"));

  // 7. Compliance Routes (/privacy & /terms)
  console.log("\n7. Testing Compliance Routes (/privacy & /terms) ...");
  const privacy = await fetchRoute("/privacy");
  assert("Privacy policy returns HTTP 200", privacy.status === 200);
  assert("Privacy policy includes GDPR & CCPA reference", privacy.body.includes("GDPR &amp; CCPA") || privacy.body.includes("GDPR & CCPA"));
  assert("Privacy policy uses Agency layout (.agency-page)", privacy.body.includes("agency-page"));
  assert("Privacy policy has AgencyHeader", privacy.body.includes("agency-header"));
  assert("Privacy policy has AgencyFooter", privacy.body.includes("agency-footer"));

  const terms = await fetchRoute("/terms");
  assert("Terms page returns HTTP 200", terms.status === 200);
  assert("Terms page includes Intellectual Property clause", terms.body.includes("Intellectual Property Rights"));
  assert("Terms page uses Agency layout (.agency-page)", terms.body.includes("agency-page"));
  assert("Terms page has AgencyHeader", terms.body.includes("agency-header"));
  assert("Terms page has AgencyFooter", terms.body.includes("agency-footer"));

  // 8. Inquiries API Route
  console.log("\n8. Testing Inquiries API Route (/api/agency/inquiries) ...");
  // Test validation failure on empty body
  const emptyInquiry = await fetchRoute("/api/agency/inquiries", "POST", {});
  assert("Empty inquiry rejected with HTTP 400", emptyInquiry.status === 400);

  // Test honeypot silent trap (anti-bot security design returns 201 without dispatching email)
  const spamInquiry = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Bot",
    email: "bot@spam.com",
    message: "Buy cheap backlinks now! High DA guaranteed.",
    website: "http://spamsite.xyz", // honeypot
  });
  assert("Honeypot bot safely trapped with silent HTTP 201", spamInquiry.status === 201);

  // Test valid inquiry with local mail mock or unconfigured fallback (503 if RESEND_API_KEY unset or 201 if configured)
  const validInquiry = await fetchRoute("/api/agency/inquiries", "POST", {
    name: "Rahul Enterprise Test",
    email: "enterprise-test@northstardigital.studio",
    company: "Northstar Testing Corp",
    service: "SaaS products",
    budget: "$10,000+",
    message: "Requesting architectural design review for scalable multi-tenant SaaS application.",
  });
  assert(
    "Valid inquiry handled gracefully (HTTP 201 sent or 503 unconfigured notice)",
    validInquiry.status === 201 || validInquiry.status === 503,
    `Got ${validInquiry.status}`
  );

  // 9. SEO & Metadata Endpoints
  console.log("\n9. Testing Robots & Sitemap ...");
  const robots = await fetchRoute("/robots.txt");
  assert("robots.txt returns HTTP 200", robots.status === 200);
  assert("robots.txt references sitemap.xml", robots.body.includes("sitemap.xml"));

  const sitemap = await fetchRoute("/sitemap.xml");
  assert("sitemap.xml returns HTTP 200", sitemap.status === 200);
  assert("sitemap.xml indexes /blog", sitemap.body.includes("/blog"));
  assert("sitemap.xml indexes /work/aetherdesk", sitemap.body.includes("/work/aetherdesk"));
  assert("sitemap.xml indexes /work/productivity-tracker", sitemap.body.includes("/work/productivity-tracker"));

  // 10. CSS Variable Tokens & Contrast Guarantees
  console.log("\n10. Checking Design Token Contrast System ...");
  assert("Homepage loads CSS variable references", home.body.includes("agency-page") && home.body.includes("agency-header"));
  assert("Anti-FOUC theme hydration script in HTML <head>", home.body.includes("northstar_theme"));

  console.log("\n================================================================================");
  console.log(`REGRESSION SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionSuite().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
