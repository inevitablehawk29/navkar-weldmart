import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { EnquiryFormInner } from "./EnquiryFormInner";

export function ProjectEnquiryForm() {
  return (
    <Card className="bg-card rounded-xl border border-border shadow-sm max-w-4xl mx-auto">
      <CardHeader className="p-5 md:p-8 pb-0 md:pb-0 mb-6">
        <CardTitle className="text-2xl font-heading text-foreground mb-2">Project Enquiry</CardTitle>
        <CardDescription className="text-muted text-sm md:text-base">
          Please provide details about your project to help us understand your requirements.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 md:p-8 pt-0 md:pt-0">
        <EnquiryFormInner />
      </CardContent>
    </Card>
  );
}
