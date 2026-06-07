"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-surface border-b border-border py-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-8 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h1 className="text-2xl font-semibold text-primary mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-primary/90 transition-colors duration-300 rounded-md"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm font-medium hover:bg-accent/5 transition-colors duration-300 rounded-md"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
