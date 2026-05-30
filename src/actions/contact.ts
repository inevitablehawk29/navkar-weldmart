"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import { ContactResponse } from "@/types/contact";

export async function submitContactForm(data: unknown): Promise<ContactResponse> {
  try {
    // Validate the incoming data
    const parsedData = contactFormSchema.parse(data);

    // TODO: In the future, this is where we will integrate with the Cloudflare Worker API.
    // For example:
    // const response = await fetch("https://api.navkarweldmart.com/contact", {
    //   method: "POST",
    //   body: JSON.stringify(parsedData),
    // });
    
    console.log("Mock submission received:", parsedData);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      message: "Thank you. Our team will review your enquiry and get in touch shortly.",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
