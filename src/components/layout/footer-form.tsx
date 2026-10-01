"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Check } from "lucide-react";

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
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");
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
      <div className="flex h-full min-h-[300px] flex-col items-start justify-center border border-white/15 p-8">
        <Check className="mb-5 h-8 w-8 text-arc-light" strokeWidth={2.5} />
        <h3 className="type-h3 mb-2">Enquiry sent</h3>
        <p className="mb-6 text-steel-300">
          Thanks. We&apos;ll call you back on the number you gave us.
        </p>
        <Button 
          variant="outline" 
          className="btn btn-outline h-auto rounded-[2px] bg-transparent text-white hover:bg-white/10 hover:text-white"
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
      <div className="flex h-full min-h-[300px] flex-col items-start justify-center border border-white/15 p-8">
        <h3 className="type-h3 mb-6">One quick check</h3>
        <div className="flex justify-center mb-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            options={{ theme: "dark" }}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
          />
        </div>
        <p className="text-white/70 text-sm mb-4">
          {isSubmitting ? "Verifying and sending..." : "Confirm you’re not a bot to send your enquiry."}
        </p>
        {serverError && (
          <div className="w-full">
            <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[2px] text-sm mb-3">
              {serverError}
            </div>
            <Button 
              variant="outline" 
              className="btn btn-outline h-auto rounded-[2px] bg-transparent text-white hover:bg-white/10 hover:text-white"
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
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-steel-300">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    autoComplete="name"
                    className="h-12 rounded-[2px] border-white/15 bg-white/[0.04] text-base text-white placeholder:text-white/30 focus-visible:border-arc-light focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-300" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-steel-300">Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+91"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="h-12 rounded-[2px] border-white/15 bg-white/[0.04] text-base text-white placeholder:text-white/30 focus-visible:border-arc-light focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-300" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-steel-300">Email <span className="font-normal text-steel-400">(optional)</span></FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="email"
                  autoComplete="email"
                  className="h-12 rounded-[2px] border-white/15 bg-white/[0.04] text-base text-white placeholder:text-white/30 focus-visible:border-arc-light focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-300" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-steel-300">About the project</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type of structure, size, location"
                  rows={3}
                  className="min-h-28 resize-none rounded-[2px] border-white/15 bg-white/[0.04] text-base text-white placeholder:text-white/30 focus-visible:border-arc-light focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-300" />
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
          <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[2px] text-sm">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary h-auto w-full sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </Button>
      </form>
    </Form>
  );
}
