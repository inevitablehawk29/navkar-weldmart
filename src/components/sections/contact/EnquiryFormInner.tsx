"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm } from "@/actions/contact";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EnquiryFormInner({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [pendingData, setPendingData] = useState<ContactFormValues | null>(null);
  const [showTurnstile, setShowTurnstile] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      projectType: undefined,
      projectLocation: "",
      estimatedBudget: undefined,
      source: undefined,
      projectDetails: "",
      turnstileToken: "",
      faxNumber: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setServerError(null);
    setPendingData(data);
    setShowTurnstile(true);
  }

  async function handleTurnstileSuccess(token: string) {
    form.setValue("turnstileToken", token);
    form.clearErrors("turnstileToken");
    
    if (pendingData) {
      try {
        const finalData = { ...pendingData, turnstileToken: token };
        const response = await submitContactForm(finalData);
        if (response.success) {
          setIsSuccess(true);
          form.reset();
          if (onSuccess) onSuccess();
        } else {
          setServerError(response.message);
        }
      } catch {
        setServerError("An unexpected error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
        setPendingData(null);
        setShowTurnstile(false);
      }
    }
  }

  function handleTurnstileError() {
    setServerError("Security check failed. Please try again.");
    setIsSubmitting(false);
    setPendingData(null);
    setShowTurnstile(false);
  }

  if (isSuccess) {
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-[250px] py-4">
        <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
        </div>
        <h3 className="text-2xl font-heading text-foreground mb-3">Thank you.</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
          Our team will review your enquiry and get in touch shortly.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            setIsSuccess(false);
            setShowTurnstile(false);
          }}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  if (showTurnstile) {
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-[250px] py-4">
        <h3 className="text-xl font-heading text-foreground mb-6">Security Check</h3>
        <div className="flex justify-center mb-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            options={{ theme: "light" }}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
          />
        </div>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-4">
          {isSubmitting ? "Verifying and sending..." : "Please complete the security check to continue."}
        </p>
        {serverError && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-xs max-w-sm mx-auto">
            {serverError}
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={() => setShowTurnstile(false)}>
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 sm:mb-5">
        <h3 className="text-lg font-heading text-foreground uppercase tracking-tight mb-0.5">Request a Project Estimate</h3>
        <p className="text-muted-foreground text-xs leading-tight">
          Please provide details about your project to help us understand your requirements.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Rahul Sharma" 
                      className="bg-transparent border-input h-9 text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+91 98765 43210" 
                      className="bg-transparent border-input h-9 text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="rahul@example.com" 
                      type="email"
                      className="bg-transparent border-input h-9 text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectLocation"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Project Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Indore, MP" 
                      className="bg-transparent border-input h-9 text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Project Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-input h-9 text-sm">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" sideOffset={4}>
                      <SelectItem value="Material Supply">Material Supply</SelectItem>
                      <SelectItem value="Structural Fabrication">Structural Fabrication</SelectItem>
                      <SelectItem value="Industrial Shed">Industrial Shed</SelectItem>
                      <SelectItem value="Warehouse Structure">Warehouse Structure</SelectItem>
                      <SelectItem value="Architectural Metalwork">Architectural Metalwork</SelectItem>
                      <SelectItem value="Residential Fabrication">Residential Fabrication</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedBudget"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Estimated Budget <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-input h-9 text-sm">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" sideOffset={4}>
                      <SelectItem value="Under ₹2 Lakh">Under ₹2 Lakh</SelectItem>
                      <SelectItem value="₹2–5 Lakh">₹2–5 Lakh</SelectItem>
                      <SelectItem value="₹5–10 Lakh">₹5–10 Lakh</SelectItem>
                      <SelectItem value="₹10 Lakh+">₹10 Lakh+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    How did you hear about us?
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-input h-9 text-sm">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" sideOffset={4}>
                      <SelectItem value="Architect">Architect</SelectItem>
                      <SelectItem value="Builder">Builder</SelectItem>
                      <SelectItem value="Existing Client">Existing Client</SelectItem>
                      <SelectItem value="BNI Referral">BNI Referral</SelectItem>
                      <SelectItem value="Google Search">Google Search</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Project Details <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your requirements, dimensions, or specific materials needed..."
                    className="bg-transparent border-input min-h-[60px] text-sm resize-none p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {serverError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-xs">
              {serverError}
            </div>
          )}

          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("faxNumber")}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto h-9 px-6 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground group mt-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Get Project Estimate
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
