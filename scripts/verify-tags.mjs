import http from "node:http";

function get(path) {
  return new Promise((resolve) => {
    http.get("http://localhost:3000" + path, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
  });
}

async function verifyTags() {
  console.log("Testing Article Tag Links...");
  const article = await get("/blog/securing-modern-rest-apis-rate-limiting-tokens");
  console.log("Article HTTP Status:", article.status);
  console.log("1. API Security Link:", article.body.includes('href="/blog?tag=API%20Security"'));
  console.log("2. OAuth Link:", article.body.includes('href="/blog?tag=OAuth"'));
  console.log("3. Rate Limiting Link:", article.body.includes('href="/blog?tag=Rate%20Limiting"'));
  console.log("4. Node.js Link:", article.body.includes('href="/blog?tag=Node.js"'));
  console.log("5. FastAPI Link:", article.body.includes('href="/blog?tag=FastAPI"'));

  console.log("\nTesting Topic Filter Page (/blog?tag=API%20Security)...");
  const tagFilter = await get("/blog?tag=API%20Security");
  console.log("Tag Filter HTTP Status:", tagFilter.status);
  console.log("1. Contains 'Active Topic Filter':", tagFilter.body.includes("Active Topic Filter"));
  console.log("2. Contains 'API Security':", tagFilter.body.includes("API Security"));
  console.log("3. Lists filtered article:", tagFilter.body.includes("Hardening Enterprise APIs"));
  console.log("4. Contains 'Clear filter' button:", tagFilter.body.includes("Clear filter"));

  console.log("\nTesting Blog Hub Tag Bar (/blog)...");
  const blogHub = await get("/blog");
  console.log("Blog Hub HTTP Status:", blogHub.status);
  console.log("1. Contains 'Browse Topics & Technologies':", blogHub.body.includes("Browse Topics &amp; Technologies") || blogHub.body.includes("Browse Topics & Technologies"));
  console.log("2. Contains All Topics pill:", blogHub.body.includes("All Topics"));
}

verifyTags();
