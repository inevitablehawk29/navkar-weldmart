"use server";

import { contactFormSchema, footerFormSchema } from "@/lib/validations/contact";
import { ContactResponse } from "@/types/contact";
import { Resend } from "resend";
import React from "react";
import { render } from "@react-email/render";
import { LeadNotificationEmail, getLeadNotificationEmailText } from "@/emails/LeadNotificationEmail";
import { CustomerConfirmationEmail, getCustomerConfirmationEmailText } from "@/emails/CustomerConfirmationEmail";

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

    // 2. If client email is provided, send Customer Confirmation Email asynchronously
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

        // Send Customer Confirmation Email (do not block user response if this fails)
        resend.emails.send({
          from: "Navkar Weldmart <contact@navkarweldmart.com>",
          to: [parsedData.emailAddress],
          subject: "We've Received Your Enquiry – Navkar Weldmart",
          replyTo: "navkarweldmart@gmail.com",
          html: customerEmailHtml,
          text: customerEmailText,
        }).catch((err) => {
          console.error("Async customer confirmation send error:", err);
        });

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
