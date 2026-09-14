'use client'

import { getBreakpoint } from '@/lib/constants'
import { useScreenInfo, useViewport } from '@/lib/use-viewport'
import { ControlRail } from '@/components/control-rail'
import { DimensionFrame } from '@/components/dimension-frame'
import { BreakpointScale } from '@/components/breakpoint-scale'
import { SpecSheet } from '@/components/spec-sheet'
import { DeviceTable } from '@/components/device-table'

export default function ScreenSizePage() {
  const { width, height } = useViewport()
  const screen = useScreenInfo()
  const breakpoint = getBreakpoint(width)

  const summaryText = `Viewport: ${width}×${height} | Breakpoint: ${breakpoint.name} | DPR: ${screen.pixelRatio} | Screen: ${screen.screenWidth}×${screen.screenHeight}`

  return (
    <div className="page">
      <ControlRail width={width} height={height} breakpoint={breakpoint} summaryText={summaryText} />

      <main className="sheet">
        <DimensionFrame width={width} height={height} breakpoint={breakpoint} />

        <BreakpointScale width={width} activeName={breakpoint.name} />

        <div className="sheet-grid">
          <SpecSheet
            title="Viewport"
            rows={[
              { label: 'Width', value: String(width), unit: 'px' },
              { label: 'Height', value: String(height), unit: 'px' },
              { label: 'Aspect ratio', value: height ? (width / height).toFixed(3) : '—' },
              { label: 'Breakpoint', value: breakpoint.name },
            ]}
          />
          <SpecSheet
            title="Display"
            rows={[
              { label: 'Screen resolution', value: `${screen.screenWidth}×${screen.screenHeight}` },
              { label: 'Device pixel ratio', value: String(screen.pixelRatio), unit: '×' },
              { label: 'Color depth', value: String(screen.colorDepth), unit: 'bit' },
              { label: 'Orientation', value: screen.orientation },
            ]}
          />
          <SpecSheet
            title="Capabilities"
            rows={[
              { label: 'Touch support', value: screen.touchSupport ? 'Yes' : 'No' },
              { label: 'Prefers dark', value: screen.darkMode ? 'Yes' : 'No' },
              { label: 'Network status', value: screen.online ? 'Online' : 'Offline' },
            ]}
          />
        </div>

        <DeviceTable viewportWidth={width} />
      </main>
    </div>
  )
}
