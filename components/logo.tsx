type LogoProps = {
  size?: number
  className?: string
}

/**
 * Original mark for ScreenSize: a corner resize-handle with a diagonal
 * drag arrow, drawn as clean geometric strokes. Works from favicon scale
 * (16px) up to hero scale (512px) since it's pure stroked geometry.
 */
export function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* frame corner, top-left */}
      <path
        d="M4 12V6a2 2 0 0 1 2-2h6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* frame corner, bottom-right (resize handle) */}
      <path
        d="M28 20v6a2 2 0 0 1-2 2h-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* diagonal drag-to-resize arrow, double-headed */}
      <path
        d="M10 10 22 22"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M16 20 22 22 20 16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12 10 10 12 16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
