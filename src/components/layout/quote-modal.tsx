"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectEnquiryForm } from "@/components/sections/contact/ProjectEnquiryForm";

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
        className="w-[95vw] sm:max-w-xl max-h-[95vh] overflow-y-auto p-0 bg-transparent border-none shadow-none"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Get A Quote</DialogTitle>
        <DialogDescription className="sr-only">Request a project estimate.</DialogDescription>
        {open && <ProjectEnquiryForm />}
      </DialogContent>
    </Dialog>
  );
}
