import { z } from "zod";
import { agencyServices } from "@/lib/agency";

const budgetOptions = [
  "",
  "Under $2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
] as const;

const serviceOptions = [
  "",
  ...agencyServices.map((service) => service.title),
  "Not sure yet",
] as const;

export const createAgencyInquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(serviceOptions).optional().default(""),
  budget: z.enum(budgetOptions).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
});
