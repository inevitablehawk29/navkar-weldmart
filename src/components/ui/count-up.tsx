interface CountUpProps {
  target: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ target, suffix = "", className }: CountUpProps) {
  return <span className={className}>{target}{suffix}</span>;
}
