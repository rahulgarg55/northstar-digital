# Northstar Studio

Marketing website for Northstar Studio, built with Next.js App Router.

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
