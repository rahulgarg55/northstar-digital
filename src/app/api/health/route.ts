import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const uptimeSeconds = Math.floor(process.uptime());
  const memUsage = process.memoryUsage();

  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      version: "1.0.0",
      environment: process.env.NODE_ENV || "production",
      services: {
        website: "UP",
        inquiriesApi: "UP",
        staticDelivery: "UP",
      },
      system: {
        nodeVersion: process.version,
        memoryRssMb: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100,
        memoryHeapUsedMb: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Health-Status": "healthy",
      },
    }
  );
}
