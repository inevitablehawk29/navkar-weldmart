import React from "react";

export const PipesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="9" r="4" />
    <circle cx="15" cy="15" r="4" />
    <circle cx="9" cy="17" r="4" />
    <circle cx="15" cy="7" r="4" />
  </svg>
);

export const SheetsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 22 7 12 12 2 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

export const BrightBarsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <circle cx="12" cy="7" r="3" />
    <circle cx="12" cy="17" r="3" />
  </svg>
);

export const StructuralIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 4h14M5 20h14M12 4v16M8 4v2M16 4v2M8 18v2M16 18v2" />
  </svg>
);

export const ConsumablesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C8.686 2 6 4.686 6 8v8c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4V8c0-3.314-2.686-6-6-6z" />
    <path d="M8 8h8M8 12h8" />
  </svg>
);
