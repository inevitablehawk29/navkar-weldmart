"use server";

import { contactFormSchema, footerFormSchema } from "@/lib/validations/contact";
import { ContactResponse } from "@/types/contact";
import { Resend } from "resend";
import React from "react";
import { render } from "@react-email/render";
import { LeadNotificationEmail, getLeadNotificationEmailText } from "@/emails/LeadNotificationEmail";
import { CustomerConfirmationEmail, getCustomerConfirmationEmailText } from "@/emails/CustomerConfirmationEmail";

import { headers } from "next/headers";

// ── In-memory rate limiter (per warm serverless instance) ──
// For production-grade limiting across all instances, migrate to @upstash/ratelimit + Redis.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // max 3 submissions per IP per minute

const rateLimitMap = new Map<string, { timestamps: number[] }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }

  // Prune expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.timestamps.push(now);
  return false;
}

// Periodically clean up stale entries to prevent memory leaks
if (typeof globalThis !== "undefined") {
  const CLEANUP_INTERVAL = 5 * 60 * 1000; // every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
      entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (entry.timestamps.length === 0) rateLimitMap.delete(ip);
    }
  }, CLEANUP_INTERVAL).unref?.();
}

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

  // Generate unique Enquiry ID and Timestamp
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  const enquiryId = `ENQ-${dateStr}-${rand}`;

  let formattedTimestamp = "";
  try {
    formattedTimestamp = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(now);
  } catch {
    formattedTimestamp = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }

  const projectType = parsedData.projectType || (formType === "Main" ? "General" : "Quick Enquiry");
  const estimatedBudget = parsedData.estimatedBudget || "Not specified";
  const projectLocation = parsedData.projectLocation || "Not specified";
  const projectDetails = parsedData.projectDetails || "No details provided.";

  if (!apiKey) {
    // Fallback: If no API key is provided, log to console and simulate delay
    console.log(`Mock submission received (${formType} Form) [No RESEND_API_KEY found]:`, {
      enquiryId,
      timestamp: formattedTimestamp,
      ...parsedData,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "Thank you. Our team will review your enquiry and get in touch shortly.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    // 1. Render Internal Lead Notification Email
    const leadEmailHtml = await render(
      React.createElement(LeadNotificationEmail, {
        enquiryId,
        timestamp: formattedTimestamp,
        fullName: parsedData.fullName,
        phoneNumber: parsedData.phoneNumber,
        emailAddress: parsedData.emailAddress || undefined,
        projectType,
        estimatedBudget,
        projectLocation,
        source: parsedData.source || undefined,
        projectDetails,
        formType,
      })
    );

    const leadEmailText = getLeadNotificationEmailText({
      enquiryId,
      timestamp: formattedTimestamp,
      fullName: parsedData.fullName,
      phoneNumber: parsedData.phoneNumber,
      emailAddress: parsedData.emailAddress || undefined,
      projectType,
      estimatedBudget,
      projectLocation,
      source: parsedData.source || undefined,
      projectDetails,
      formType,
    });

    const leadSubject = `New Lead: ${parsedData.fullName} - ${projectType}`;

    // Send Internal Lead Notification
    const { error: leadError } = await resend.emails.send({
      from: "Navkar Weldmart <contact@navkarweldmart.com>",
      to: ["navkarweldmart@gmail.com"],
      subject: leadSubject,
      replyTo: parsedData.emailAddress || undefined,
      html: leadEmailHtml,
      text: leadEmailText,
    });

    if (leadError) {
      console.error("Resend Lead Notification API error:", leadError);
      return {
        success: false,
        message: "Failed to send the enquiry. Please try calling us instead.",
      };
    }

    // 2. If client email is provided, send Customer Confirmation Email
    if (parsedData.emailAddress) {
      try {
        const customerEmailHtml = await render(
          React.createElement(CustomerConfirmationEmail, {
            enquiryId,
            fullName: parsedData.fullName,
            projectType,
            projectLocation,
            estimatedBudget: formType === "Main" ? estimatedBudget : undefined,
            projectDetails,
          })
        );

        const customerEmailText = getCustomerConfirmationEmailText({
          enquiryId,
          fullName: parsedData.fullName,
          projectType,
          projectLocation,
          estimatedBudget: formType === "Main" ? estimatedBudget : undefined,
          projectDetails,
        });

        // Send Customer Confirmation Email (awaited to ensure serverless function doesn't abort it)
        const { error: customerError } = await resend.emails.send({
          from: "Navkar Weldmart <contact@navkarweldmart.com>",
          to: [parsedData.emailAddress],
          subject: "We've Received Your Enquiry – Navkar Weldmart",
          replyTo: "navkarweldmart@gmail.com",
          html: customerEmailHtml,
          text: customerEmailText,
        });

        if (customerError) {
          console.error("Resend Customer Confirmation API error:", customerError);
        }

      } catch (custError) {
        console.error("Error generating/rendering customer confirmation email:", custError);
      }
    }

    return {
      success: true,
      message: "Thank you. Our team will review your enquiry and get in touch shortly.",
    };

  } catch (sendError) {
    console.error("Email send processing error:", sendError);
    return {
      success: false,
      message: "Validation failed or something went wrong. Please try again.",
    };
  }
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  let verificationSecret: string;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("TURNSTILE_SECRET_KEY is missing in production environment!");
      return false;
    }

    console.warn("Using Cloudflare Turnstile test secret key in development environment.");
    verificationSecret = "1x0000000000000000000000000000000AA";
  } else {
    verificationSecret = secret;
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: `secret=${encodeURIComponent(verificationSecret)}&response=${encodeURIComponent(token || "")}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    
    const turnstileData = await res.json();

    if (!turnstileData.success) {
      console.warn("Turnstile verification failed:", turnstileData["error-codes"]);
    }

    return turnstileData.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function submitContactForm(data: unknown): Promise<ContactResponse> {
  try {
    const clientHeaders = await headers();
    const ip = clientHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    if (isRateLimited(ip)) {
      return {
        success: false,
        message: "Too many requests. Please try again in a minute.",
      };
    }

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
    const clientHeaders = await headers();
    const ip = clientHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    if (isRateLimited(ip)) {
      return {
        success: false,
        message: "Too many requests. Please try again in a minute.",
      };
    }

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
