import { ContactFormValues } from "@/lib/validations/contact";

export interface ContactResponse {
  success: boolean;
  message: string;
}

export type { ContactFormValues };
