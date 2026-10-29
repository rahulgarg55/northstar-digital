# Northstar Digital Studio

Bespoke SaaS engineering, product design, and intelligence tools agency platform built with **Next.js 16 App Router**, **React 19**, and **Tailwind CSS**.

---

## 🌐 Live Application & Access

| Environment | Access Link | Description |
| :--- | :--- | :--- |
| **Public Live Website** | [**https://cinema-examining-beneficial-four.trycloudflare.com**](https://cinema-examining-beneficial-four.trycloudflare.com) | Live public portal running on Cloudflare Tunnel |
| **GitHub Repository** | [**github.com/rahulgarg55/northstar-digital**](https://github.com/rahulgarg55/northstar-digital) | Official public repository |
| **Local Host** | `http://localhost:3000` | Local Next.js 16 production server |

---

## 🚀 Key Features

- **Next.js 16 App Router & Turbopack:** 41 statically pre-rendered pages with dynamic API routes.
- **Agency Portfolio & Work Showcase:** Deep-dive case studies for AetherDesk, ReportIQ, and BugTracker.
- **Enterprise Inquiry Defense:** Rate-limited contact API (5 submissions / 10-min window per IP), honeypot bot trap, and 16KB payload limiter.
- **Automated Technical Publications:** Daily technical articles covering multi-tenant SaaS architecture, telemetry, and React Server Components.
- **Complete SEO & Structured Metadata:** OpenGraph tags, Twitter cards, JSON-LD Schema.org agency metadata, dynamic sitemap.xml, and robots.txt.

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project inquiries

The contact form sends inquiries with Resend. Set these environment variables in `.env.local` to enable delivery:

```dotenv
RESEND_API_KEY=
AGENCY_EMAIL_FROM=
AGENCY_ADMIN_EMAILS=
```

`AGENCY_EMAIL_FROM` must be a sender address verified with Resend. `AGENCY_ADMIN_EMAILS` accepts one or more comma-separated recipient addresses. The application does not store submitted inquiry details.

## Build

```bash
npm run lint
npm run build
```
