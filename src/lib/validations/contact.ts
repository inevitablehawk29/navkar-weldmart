import * as z from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  emailAddress: z.string().email("Please enter a valid email address"),
  projectType: z.enum([
    "Material Supply",
    "Structural Fabrication",
    "Industrial Shed",
    "Warehouse Structure",
    "Architectural Metalwork",
    "Residential Fabrication",
    "Other"
  ], {
    message: "Please select a project type.",
  }),
  projectLocation: z.string().min(2, "Please enter the project location"),
  estimatedBudget: z.enum([
    "Under ₹2 Lakh",
    "₹2–5 Lakh",
    "₹5–10 Lakh",
    "₹10 Lakh+"
  ], {
    message: "Please select an estimated budget.",
  }),
  source: z.enum([
    "Architect",
    "Builder",
    "Existing Client",
    "BNI Referral",
    "Google Search",
    "Social Media",
    "Other"
  ], {
    message: "Please let us know how you heard about us.",
  }),
  projectDetails: z.string().min(10, "Please provide some details about your project").max(1000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const footerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  emailAddress: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  projectDetails: z.string().min(5, "Please provide some details about your project").max(1000),
});

export type FooterFormValues = z.infer<typeof footerFormSchema>;
