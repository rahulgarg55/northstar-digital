"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

const services = [
  "Website development",
  "MERN stack applications",
  "E-commerce",
  "Mobile apps",
  "SaaS products",
  "UI/UX design",
  "SEO",
  "Content writing",
  "Digital marketing",
  "API integrations",
  "Custom software",
  "Not sure yet",
];

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/agency/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { error?: { message?: string } };
      if (!response.ok) {
        setErrorMessage(result.error?.message || "We couldn’t send your message. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setErrorMessage("We couldn’t reach the server. Please email us directly instead.");
      setStatus("error");
    }
  }

  return (
    <form className="agency-contact-form" onSubmit={handleSubmit}>
      <div className="agency-form-grid">
        <label>
          Your name <span aria-hidden="true">*</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label>
          Work email <span aria-hidden="true">*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <div className="agency-form-grid">
        <label>
          Company <span className="agency-optional">(optional)</span>
          <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          What do you need?
          <select name="service" defaultValue={initialService}>
            <option value="">Choose a service</option>
            {services.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
      </div>
      <label>
        Project budget <span className="agency-optional">(optional)</span>
        <select name="budget" defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Under $2,500</option>
          <option>$2,500–$5,000</option>
          <option>$5,000–$10,000</option>
          <option>$10,000+</option>
        </select>
      </label>
      <label>
        A little about your project <span aria-hidden="true">*</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={5000}
          placeholder="What are you working on, and what would a good outcome look like?" />
      </label>
      <label className="agency-honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="agency-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <>Sending <LoaderCircle size={16} className="agency-spin" /></>
          : status === "sent" ? <>Message received <Check size={16} /></>
            : <>Send project inquiry <ArrowRight size={16} /></>}
      </button>
      <p className="agency-form-note" aria-live="polite">
        {status === "sent" ? "Thanks for reaching out. We’ll get back to you shortly."
          : status === "error" ? errorMessage
            : "Your project details are only used to respond to your inquiry."}
      </p>
    </form>
  );
}
