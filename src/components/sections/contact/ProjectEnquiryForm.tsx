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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function ProjectEnquiryForm() {
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
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="bg-card rounded-xl border border-border shadow-sm max-w-4xl mx-auto">
        <CardContent className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
          </div>
          <h3 className="text-3xl font-heading text-foreground mb-4">Thank you.</h3>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Our team will review your enquiry and get in touch shortly.
          </p>
          <Button 
            variant="outline" 
            className="mt-8"
            onClick={() => setIsSuccess(false)}
          >
            Submit another enquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card rounded-xl border border-border shadow-sm max-w-4xl mx-auto">
      <CardHeader className="p-5 md:p-8 pb-0 md:pb-0 mb-6">
        <CardTitle className="text-2xl font-heading text-foreground mb-2">Project Enquiry</CardTitle>
        <CardDescription className="text-muted text-sm md:text-base">
          Please provide details about your project to help us understand your requirements.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 md:p-8 pt-0 md:pt-0">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="sm:col-span-1 lg:col-span-3">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-background border-border/50 h-10 text-sm focus-visible:ring-accent" 
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
                <FormItem className="sm:col-span-1 lg:col-span-3">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+91 98765 43210" 
                      className="bg-background border-border/50 h-10 text-sm focus-visible:ring-accent" 
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
                <FormItem className="sm:col-span-1 lg:col-span-3">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
                      type="email"
                      className="bg-background border-border/50 h-10 text-sm focus-visible:ring-accent" 
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
                <FormItem className="sm:col-span-1 lg:col-span-3">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City, State" 
                      className="bg-background border-border/50 h-10 text-sm focus-visible:ring-accent" 
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
                <FormItem className="sm:col-span-1 lg:col-span-2">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border/50 h-10 text-sm focus:ring-accent">
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
                <FormItem className="sm:col-span-1 lg:col-span-2">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estimated Budget</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border/50 h-10 text-sm focus:ring-accent">
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
                <FormItem className="sm:col-span-2 lg:col-span-2">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How did you hear about us?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border/50 h-10 text-sm focus:ring-accent">
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
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your requirements, dimensions, or specific materials needed..."
                    className="bg-background border-border/50 min-h-[100px] text-sm resize-none focus-visible:ring-accent p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {serverError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">
              {serverError}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto h-10 px-8 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground group"
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
      </CardContent>
    </Card>
  );
}
