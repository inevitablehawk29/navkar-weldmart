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
    <section className="bg-galv-100">
      <div className="container-wide min-h-[80svh] content-center pb-20 pt-[calc(var(--header-h)+4rem)]">
        <h1 className="type-h1 max-w-[14ch]">This page didn&apos;t load properly</h1>
        <p className="type-lead mt-6 max-w-[46ch] text-steel-500">
          Try again. If it keeps happening, call us on +91 96697 69760 and we&apos;ll help directly.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
