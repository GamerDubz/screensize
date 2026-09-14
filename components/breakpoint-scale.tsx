import { LAST_SEGMENT_WIDTH, TAILWIND_BREAKPOINTS } from '@/lib/constants'

type BreakpointScaleProps = {
  width: number
  activeName: string
}

const domainMax =
  TAILWIND_BREAKPOINTS[TAILWIND_BREAKPOINTS.length - 2].max + LAST_SEGMENT_WIDTH

/** A ruled scale bar marking the Tailwind breakpoints, with the current width flagged. */
export function BreakpointScale({ width, activeName }: BreakpointScaleProps) {
  const domain = Math.max(domainMax, width + 120)
  const markerPct = Math.min((width / domain) * 100, 100)

  return (
    <section aria-labelledby="scale-heading" className="scale-block">
      <h2 id="scale-heading" className="section-label">
        Tailwind breakpoint scale
      </h2>

      <div className="scale-track">
        <div className="scale-marker" style={{ left: `${markerPct}%` }} aria-hidden="true">
          <span className="scale-marker-flag">{width}</span>
        </div>
        <div className="scale-segments">
          {TAILWIND_BREAKPOINTS.map((bp) => {
            const segMax = bp.max === Infinity ? bp.min + LAST_SEGMENT_WIDTH : bp.max
            const segWidth = ((segMax - bp.min) / domain) * 100
            const isActive = bp.name === activeName
            return (
              <div
                key={bp.name}
                className={isActive ? 'scale-segment scale-segment-active' : 'scale-segment'}
                style={{ width: `${segWidth}%` }}
              >
                <span className="scale-segment-name">{bp.name}</span>
                <span className="scale-segment-min">{bp.min === 0 ? '0' : `${bp.min}`}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
