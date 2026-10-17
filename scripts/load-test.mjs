// Repeatable Load Testing & Capacity Validation for Northstar Digital
// Tests anonymous browsing, multi-route concurrency, API latency, and throughput

import http from "node:http";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = [
  "/",
  "/services",
  "/work",
  "/blog",
  "/contact",
  "/api/health",
  "/services/web-development",
  "/blog/building-multi-tenant-saas-architecture-nextjs-typescript"
];

function fetchRoute(path) {
  return new Promise((resolve) => {
    const start = performance.now();
    const url = new URL(path, BASE_URL);

    const req = http.get(url, { agent: new http.Agent({ keepAlive: true }) }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        const duration = performance.now() - start;
        resolve({ status: res.statusCode, duration, success: res.statusCode >= 200 && res.statusCode < 400 });
      });
    });

    req.on("error", (err) => {
      const duration = performance.now() - start;
      resolve({ status: 500, duration, success: false, error: err.message });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ status: 408, duration: 5000, success: false, error: "timeout" });
    });
  });
}

async function runStage(concurrency, totalRequests) {
  const latencies = [];
  let successful = 0;
  let failed = 0;
  const startTime = performance.now();

  let issued = 0;
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (issued < totalRequests) {
      const current = issued++;
      const route = ROUTES[current % ROUTES.length];
      const res = await fetchRoute(route);
      latencies.push(res.duration);
      if (res.success) successful++;
      else failed++;
    }
  });

  await Promise.all(workers);
  const totalDurationSeconds = (performance.now() - startTime) / 1000;
  latencies.sort((a, b) => a - b);

  const p50 = latencies[Math.floor(latencies.length * 0.50)] || 0;
  const p90 = latencies[Math.floor(latencies.length * 0.90)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length || 0;
  const rps = totalRequests / totalDurationSeconds;

  return {
    concurrency,
    totalRequests,
    successful,
    failed,
    durationSeconds: totalDurationSeconds.toFixed(2),
    rps: rps.toFixed(1),
    avgMs: avg.toFixed(2),
    p50Ms: p50.toFixed(2),
    p90Ms: p90.toFixed(2),
    p95Ms: p95.toFixed(2),
    p99Ms: p99.toFixed(2),
  };
}

async function main() {
  console.log("================================================================================");
  console.log(` NORTHSTAR DIGITAL STUDIO — ENTERPRISE LOAD & CAPACITY VALIDATION`);
  console.log(` Target Base URL: ${BASE_URL}`);
  console.log("================================================================================\n");

  console.log("Stage 1: Smoke Test (Concurrency: 10, Total Requests: 50)...");
  const smoke = await runStage(10, 50);
  console.log(`  -> RPS: ${smoke.rps} req/s | Success: ${smoke.successful}/${smoke.totalRequests} | p95: ${smoke.p95Ms}ms`);

  console.log("\nStage 2: Moderate Load (Concurrency: 50, Total Requests: 250)...");
  const moderate = await runStage(50, 250);
  console.log(`  -> RPS: ${moderate.rps} req/s | Success: ${moderate.successful}/${moderate.totalRequests} | p95: ${moderate.p95Ms}ms`);

  console.log("\nStage 3: High Concurrency Spike (Concurrency: 100, Total Requests: 500)...");
  const spike = await runStage(100, 500);
  console.log(`  -> RPS: ${spike.rps} req/s | Success: ${spike.successful}/${spike.totalRequests} | p95: ${spike.p95Ms}ms`);

  console.log("\n================================================================================");
  console.log(" CAPACITY VALIDATION SUMMARY");
  console.log("================================================================================");
  console.table([smoke, moderate, spike]);

  if (smoke.failed > 0 || moderate.failed > 0 || spike.failed > 0) {
    console.error("❌ Load test failed: Errors encountered under load.");
    process.exit(1);
  } else {
    console.log("✓ ALL CAPACITY GATES PASSED (0 timeouts, 0 errors, high throughput).");
  }
}

main().catch((err) => {
  console.error("Load test fatal error:", err);
  process.exit(1);
});
