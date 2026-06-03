"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { footerFormSchema, FooterFormValues } from "@/lib/validations/contact";
import { submitFooterForm } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function FooterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [pendingData, setPendingData] = useState<FooterFormValues | null>(null);
  const [showTurnstile, setShowTurnstile] = useState(false);

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      projectDetails: "",
      faxNumber: "",
      turnstileToken: "",
    },
  });

  async function onSubmit(data: FooterFormValues) {
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
        const response = await submitFooterForm(finalData);
        if (response.success) {
          setIsSuccess(true);
          form.reset();
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
      <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center flex flex-col items-center justify-center h-full min-h-[300px]">
        <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
        </div>
        <h3 className="text-xl font-heading mb-2">Message Sent</h3>
        <p className="text-white/70 text-sm mb-6">
          Thank you. We will get back to you shortly.
        </p>
        <Button 
          variant="outline" 
          className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white text-white h-9 px-4 text-xs"
          onClick={() => {
            setIsSuccess(false);
            setShowTurnstile(false);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  if (showTurnstile) {
    return (
      <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center flex flex-col items-center justify-center h-full min-h-[300px]">
        <h3 className="text-xl font-heading mb-6">Security Check</h3>
        <div className="flex justify-center mb-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            options={{ theme: "dark" }}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
          />
        </div>
        <p className="text-white/70 text-sm mb-4">
          {isSubmitting ? "Verifying and sending..." : "Please complete the security check."}
        </p>
        {serverError && (
          <div className="w-full">
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm mb-3">
              {serverError}
            </div>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white text-white h-9 px-4 text-xs"
              onClick={() => setShowTurnstile(false)}
            >
              Go Back
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Name"
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address (Optional)"
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Project Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project"
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent resize-none rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
        
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("faxNumber")}
          />
        </div>
        
        {serverError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2 bg-accent text-white hover:bg-accent-dark rounded-sm group mt-2"
        >
          {isSubmitting ? "Sending..." : "Send Enquiry"}
          {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        </Button>
      </form>
    </Form>
  );
}
