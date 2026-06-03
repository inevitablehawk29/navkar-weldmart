import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { EnquiryFormInner } from "./EnquiryFormInner";

export function ProjectEnquiryForm() {
  return (
    <Card className="w-full bg-card rounded-2xl border border-border shadow-sm mx-auto">


      <CardContent className="p-4 md:p-6">
        <EnquiryFormInner />
      </CardContent>
    </Card>
  );
}
