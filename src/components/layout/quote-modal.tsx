"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnquiryFormInner } from "@/components/sections/contact/EnquiryFormInner";

interface QuoteModalProps {
  children: ReactNode;
}

export function QuoteModal({ children }: QuoteModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent 
        className="w-[95vw] sm:max-w-2xl max-h-[95vh] overflow-y-auto p-5 sm:p-8 rounded-xl bg-surface border-border"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="mb-4 sm:mb-6 text-left">
          <DialogTitle className="text-2xl sm:text-3xl font-heading text-foreground uppercase tracking-tight">Get A Quote</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Tell us about your project requirements and our team will get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="pb-2">
          {open && <EnquiryFormInner />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
