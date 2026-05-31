"use server";

import { contactFormSchema, footerFormSchema } from "@/lib/validations/contact";
import { ContactResponse } from "@/types/contact";
import { Resend } from "resend";

export type EmailData = {
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  projectLocation?: string;
  estimatedBudget?: string;
  source?: string;
  projectDetails?: string;
  projectType?: string;
};

async function sendResendEmail(parsedData: EmailData, formType: "Main" | "Footer"): Promise<ContactResponse> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fallback: If no API key is provided, log to console and simulate delay
    console.log(`Mock submission received (${formType} Form) [No RESEND_API_KEY found]:`, parsedData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "Thank you. Our team will review your enquiry and get in touch shortly.",
    };
  }

  const resend = new Resend(apiKey);

  let htmlBody = "";
  let subject = "";

  if (formType === "Main") {
    subject = `New Lead: ${parsedData.fullName} - ${parsedData.projectType || "Enquiry"}`;
    htmlBody = `
      <h2>New Enquiry: ${parsedData.projectType || "General"}</h2>
      <p><strong>Name:</strong> ${parsedData.fullName}</p>
      <p><strong>Phone:</strong> ${parsedData.phoneNumber}</p>
      <p><strong>Email:</strong> ${parsedData.emailAddress || "Not provided"}</p>
      <p><strong>Location:</strong> ${parsedData.projectLocation || "Not provided"}</p>
      <p><strong>Budget:</strong> ${parsedData.estimatedBudget || "Not provided"}</p>
      <p><strong>Source:</strong> ${parsedData.source || "Not provided"}</p>
      <h3>Project Details:</h3>
      <p>${parsedData.projectDetails ? parsedData.projectDetails.replace(/\n/g, '<br>') : "No additional details provided."}</p>
    `;
  } else {
    subject = `New Quick Enquiry: ${parsedData.fullName}`;
    htmlBody = `
      <h2>New Quick Enquiry (Footer Form)</h2>
      <p><strong>Name:</strong> ${parsedData.fullName}</p>
      <p><strong>Phone:</strong> ${parsedData.phoneNumber}</p>
      <p><strong>Email:</strong> ${parsedData.emailAddress || "Not provided"}</p>
      <h3>Project Details:</h3>
      <p>${parsedData.projectDetails ? parsedData.projectDetails.replace(/\n/g, '<br>') : "No additional details provided."}</p>
    `;
  }

  // Send the email
  const { error } = await resend.emails.send({
    from: "Navkar Weldmart <onboarding@resend.dev>",
    to: ["navkarweldmart@gmail.com"], // Must be the verified Resend email address
    subject: subject,
    replyTo: parsedData.emailAddress || undefined,
    html: htmlBody,
  });

  if (error) {
    console.error("Resend API error:", error);
    return {
      success: false,
      message: "Failed to send the enquiry. Please try calling us instead.",
    };
  }

  return {
    success: true,
    message: "Thank you. Our team will review your enquiry and get in touch shortly.",
  };
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token || "")}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  
  const turnstileData = await res.json();
  return turnstileData.success === true;
}

export async function submitContactForm(data: unknown): Promise<ContactResponse> {
  try {
    const parsedData = contactFormSchema.parse(data);

    // Honeypot check
    if (parsedData.faxNumber) {
      console.warn("Bot detected via honeypot");
      return { success: false, message: "Validation failed or something went wrong. Please try again." };
    }

    // Turnstile verification
    const isValidToken = await verifyTurnstile(parsedData.turnstileToken);
    if (!isValidToken) {
      return { success: false, message: "Security check failed. Please try again." };
    }

    return await sendResendEmail(parsedData, "Main");
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Validation failed or something went wrong. Please try again.",
    };
  }
}

export async function submitFooterForm(data: unknown): Promise<ContactResponse> {
  try {
    const parsedData = footerFormSchema.parse(data);

    // Honeypot check
    if (parsedData.faxNumber) {
      console.warn("Bot detected via honeypot");
      return { success: false, message: "Validation failed or something went wrong. Please try again." };
    }

    // Turnstile verification
    const isValidToken = await verifyTurnstile(parsedData.turnstileToken);
    if (!isValidToken) {
      return { success: false, message: "Security check failed. Please try again." };
    }

    return await sendResendEmail(parsedData, "Footer");
  } catch (error) {
    console.error("Footer form submission error:", error);
    return {
      success: false,
      message: "Validation failed or something went wrong. Please try again.",
    };
  }
}
