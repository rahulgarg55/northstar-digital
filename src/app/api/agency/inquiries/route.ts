import { createAgencyInquirySchema } from "@/lib/agency-inquiry";

export const runtime = "nodejs";

// In-memory rate limiting map: ip -> timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: { message } }, { status });
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  if (isRateLimited(ip)) {
    return errorResponse("Too many requests. Please try again later.", 429);
  }
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 16_000) {
    return errorResponse("Your inquiry is too large.", 413);
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 16_000) {
      return errorResponse("Your inquiry is too large.", 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return errorResponse("Your inquiry is not valid JSON.", 400);
  }

  const parsed = createAgencyInquirySchema.safeParse(payload);
  if (!parsed.success) {
    return errorResponse(
      "Please check your name, email, service, and project details.",
      400,
    );
  }

  if (parsed.data.website) {
    return Response.json(
      { message: "Thank you. Your inquiry has been received." },
      { status: 201 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.AGENCY_EMAIL_FROM;
  const recipients = (process.env.AGENCY_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (!apiKey || !sender || recipients.length === 0) {
    return errorResponse(
      "The inquiry form is not configured yet. Please email us directly.",
      503,
    );
  }

  const inquiry = parsed.data;
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: recipients,
        reply_to: inquiry.email,
        subject: `New project inquiry from ${inquiry.name}`,
        text: [
          `Name: ${inquiry.name}`,
          `Email: ${inquiry.email}`,
          `Company: ${inquiry.company || "Not provided"}`,
          `Service: ${inquiry.service || "Not specified"}`,
          `Budget: ${inquiry.budget || "Not specified"}`,
          "",
          inquiry.message,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("Agency inquiry email request failed", error);
    return errorResponse(
      "We couldn't send your inquiry. Please email us directly instead.",
      502,
    );
  }

  if (!response.ok) {
    console.error("Agency inquiry email delivery failed", {
      status: response.status,
    });
    return errorResponse(
      "We couldn't send your inquiry. Please email us directly instead.",
      502,
    );
  }

  return Response.json(
    { message: "Thank you. Your inquiry has been received." },
    { status: 201 },
  );
}
