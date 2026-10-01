"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
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
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");
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
    if (!turnstileSiteKey) {
      setServerError("Online enquiries are temporarily unavailable. Please call +91 96697 69760.");
      return;
    }
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
      <div className="flex min-h-[300px] flex-col items-start justify-center py-4">
        <Check className="mb-5 h-9 w-9 text-arc" strokeWidth={2.5} />
        <h3 className="type-h3 mb-2">Request sent</h3>
        <p className="mb-8 max-w-sm text-steel-500">
          Thanks. We&apos;ll call you on the number you gave us to talk through the job.
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
      <div className="flex min-h-[300px] flex-col items-start justify-center py-4">
        <h3 className="type-h3 mb-6">One quick check</h3>
        <div className="mb-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            options={{ theme: "light" }}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
          />
        </div>
        <p className="mt-4 max-w-sm text-sm text-steel-500">
          {isSubmitting ? "Verifying and sending..." : "Confirm you’re not a bot to send your request."}
        </p>
        {serverError && (
          <div role="alert" className="mt-4 p-3 bg-red-50 text-red-600 rounded-[2px] text-sm max-w-sm mx-auto">
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
      <div className="mb-6">
        <h2 className="type-h3">Request a quote</h2>
        <p className="mt-1.5 text-[0.9375rem] text-steel-500">
          A few details are enough. We&apos;ll call to fill in the rest.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rahul Sharma"
                      autoComplete="name"
                      className="h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+91 98765 43210"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Email <span className="font-normal text-steel-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="rahul@example.com"
                      type="email"
                      autoComplete="email"
                      className="h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectLocation"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Site location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Indore, MP" 
                      autoComplete="address-level2"
                      className="h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Type of work
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full data-[size=default]:h-12 h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0">
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
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedBudget"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Budget <span className="font-normal text-steel-500">(optional)</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full data-[size=default]:h-12 h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0">
                        <SelectValue placeholder="Select if known" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" sideOffset={4}>
                      <SelectItem value="Under ₹2 Lakh">Under ₹2 Lakh</SelectItem>
                      <SelectItem value="₹2–5 Lakh">₹2–5 Lakh</SelectItem>
                      <SelectItem value="₹5–10 Lakh">₹5–10 Lakh</SelectItem>
                      <SelectItem value="₹10 Lakh+">₹10 Lakh+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-medium text-foreground">
                    How did you hear about us? <span className="font-normal text-steel-500">(optional)</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full data-[size=default]:h-12 h-12 rounded-[2px] border-input bg-white text-base focus-visible:border-arc focus-visible:ring-0">
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
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  About the project
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What you need, rough size or tonnage, and when"
                    className="min-h-28 resize-none rounded-[2px] border-input bg-white p-3 text-base focus-visible:border-arc focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          {serverError && (
            <div role="alert" className="p-3 bg-red-50 text-red-600 rounded-[2px] text-sm">
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
            className="btn btn-primary h-auto w-full sm:w-auto"
          >
            {isSubmitting ? "Sending…" : "Send request"}
          </Button>
        </form>
      </Form>
    </>
  );
}
