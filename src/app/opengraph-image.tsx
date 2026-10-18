import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Northstar Digital Studio — Bespoke SaaS Engineering & Product Design";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "60px 80px",
          color: "#f3f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
              NORTHSTAR DIGITAL
            </span>
            <span style={{ fontSize: 13, color: "#10b981", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Bespoke SaaS Engineering Studio
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1040 }}>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Production-grade SaaS platforms, intelligence tools & digital architectures.
          </h1>
          <p style={{ fontSize: 22, color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>
            Founded by Rahul Garg. Specialized in multi-tenant SaaS, workforce telemetry, and native desktop companions.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 20, fontSize: 16, color: "#9ca3af" }}>
            <span style={{ color: "#10b981", fontWeight: 600 }}>● Live Platforms:</span>
            <span>AetherDesk</span>
            <span>·</span>
            <span>BugTracker</span>
            <span>·</span>
            <span>ProductivityFlow</span>
          </div>
          <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
            northstardigital.studio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
