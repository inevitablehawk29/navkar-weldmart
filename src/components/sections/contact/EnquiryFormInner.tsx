"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm } from "@/actions/contact";

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
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await submitContactForm(data);
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
    }
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
          onClick={() => setIsSuccess(false)}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-background border-border/50 h-9 text-sm focus-visible:ring-accent" 
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+91 98765 43210" 
                    className="bg-background border-border/50 h-9 text-sm focus-visible:ring-accent" 
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Email Address <span className="text-muted-foreground/60 normal-case tracking-normal ml-1">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email"
                    className="bg-background border-border/50 h-9 text-sm focus-visible:ring-accent" 
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="City, State" 
                    className="bg-background border-border/50 h-9 text-sm focus-visible:ring-accent" 
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border/50 h-9 text-sm focus:ring-accent">
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Estimated Budget <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border/50 h-9 text-sm focus:ring-accent">
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
                <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  How did you hear about us? <span className="text-muted-foreground/60 normal-case tracking-normal ml-1">(Optional)</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border/50 h-9 text-sm focus:ring-accent">
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
              <FormLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Project Details <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your requirements, dimensions, or specific materials needed..."
                  className="bg-background border-border/50 min-h-[80px] text-sm resize-none focus-visible:ring-accent p-3"
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

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto h-9 px-8 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground group mt-2"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Request Consultation
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
