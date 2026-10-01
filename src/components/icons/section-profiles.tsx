import { cn } from "@/lib/utils";

/**
 * Steel section profiles drawn as cross-sections, the way they appear in a
 * section table. 48×48 grid, solid fill in currentColor.
 */

export type ProfileName =
  | "beam"
  | "channel"
  | "angle"
  | "flat"
  | "rhs"
  | "shs"
  | "chs"
  | "round"
  | "square"
  | "sheet"
  | "electrode";

const paths: Record<ProfileName, React.ReactNode> = {
  beam: <path d="M10 6h28v5H26.5v26H38v5H10v-5h11.5V11H10z" />,
  channel: <path d="M14 6h22v5H19v26h17v5H14z" />,
  angle: <path d="M13 6h5v31h19v5H13z" />,
  flat: <path d="M6 20h36v8H6z" />,
  rhs: <path fillRule="evenodd" d="M6 13h36v22H6zm4 4v14h28V17z" />,
  shs: <path fillRule="evenodd" d="M9 9h30v30H9zm4 4v22h22V13z" />,
  chs: <path fillRule="evenodd" d="M24 8a16 16 0 1 1 0 32 16 16 0 0 1 0-32zm0 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24z" />,
  round: <circle cx="24" cy="24" r="13" />,
  square: <path d="M12 12h24v24H12z" />,
  sheet: (
    <path
      d="M4 30l5-10h6l5 10h6l5-10h6l5 10h2"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="square"
    />
  ),
  electrode: (
    <>
      <path d="M6 22.5h9v3H6z" />
      <path d="M15 20h27v8H15z" />
    </>
  ),
};

interface SectionProfileProps {
  name: ProfileName;
  className?: string;
  title?: string;
}

export function SectionProfile({ name, className, title }: SectionProfileProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={cn("h-12 w-12", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {paths[name]}
    </svg>
  );
}
