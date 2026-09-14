import { Logo } from './logo'
import { CopyButton } from './copy-button'
import type { Breakpoint } from '@/lib/constants'

type ControlRailProps = {
  width: number
  height: number
  breakpoint: Breakpoint
  summaryText: string
}

export function ControlRail({ width, height, breakpoint, summaryText }: ControlRailProps) {
  return (
    <header className="rail">
      <div className="rail-brand">
        <Logo size={22} className="rail-logo" />
        <div className="rail-brand-text">
          <span className="rail-title">ScreenSize</span>
          <span className="rail-tagline">Viewport &amp; breakpoint spec sheet</span>
        </div>
      </div>

      <div className="rail-readout" role="status" aria-live="polite">
        <span className="rail-readout-value">
          {width || '—'}
          <span className="rail-readout-times">&times;</span>
          {height || '—'}
          <span className="rail-readout-unit">px</span>
        </span>
        <span className="rail-readout-bp">{breakpoint.name}</span>
        <CopyButton text={summaryText} label="Copy viewport summary" />
      </div>
    </header>
  )
}
