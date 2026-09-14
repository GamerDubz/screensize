import type { Breakpoint } from '@/lib/constants'

type DimensionFrameProps = {
  width: number
  height: number
  breakpoint: Breakpoint
}

const BOX_W = 560
const BOX_H = 300
const PAD_LEFT = 64
const PAD_TOP = 40
const PAD_RIGHT = 24
const PAD_BOTTOM = 24

/**
 * Renders the current viewport as a scaled technical drawing: a rectangle
 * with extension lines, dimension callouts, and a printed scale ratio —
 * the way an engineering drawing labels a part's width and height.
 */
export function DimensionFrame({ width, height, breakpoint }: DimensionFrameProps) {
  const availW = BOX_W - PAD_LEFT - PAD_RIGHT
  const availH = BOX_H - PAD_TOP - PAD_BOTTOM
  const safeW = width || 1
  const safeH = height || 1
  const scale = Math.min(availW / safeW, availH / safeH, 1)

  const rectW = Math.max(safeW * scale, 2)
  const rectH = Math.max(safeH * scale, 2)
  const rectX = PAD_LEFT + (availW - rectW) / 2
  const rectY = PAD_TOP + (availH - rectH) / 2

  const scaleLabel = scale >= 1 ? '1:1' : `1:${Math.round(1 / scale)}`
  const extGap = 6
  const extOver = 8
  const dimOffsetTop = 22
  const dimOffsetLeft = 38

  return (
    <figure className="frame-figure">
      <svg
        viewBox={`0 0 ${BOX_W} ${BOX_H}`}
        className="frame-svg"
        role="img"
        aria-label={`Scale drawing of the current viewport, ${width} by ${height} pixels`}
      >
        {/* registration crosshair, top-left of the drawing area */}
        <path d="M14 4v12M8 10h12" className="frame-reg" />

        {/* extension lines: top */}
        <line x1={rectX} y1={rectY - extOver} x2={rectX} y2={rectY - dimOffsetTop - extGap} className="frame-ext" />
        <line
          x1={rectX + rectW}
          y1={rectY - extOver}
          x2={rectX + rectW}
          y2={rectY - dimOffsetTop - extGap}
          className="frame-ext"
        />
        {/* dimension line: top (width) */}
        <line
          x1={rectX}
          y1={rectY - dimOffsetTop}
          x2={rectX + rectW}
          y2={rectY - dimOffsetTop}
          className="frame-dim"
          markerStart="url(#tick)"
          markerEnd="url(#tick)"
        />
        <text x={rectX + rectW / 2} y={rectY - dimOffsetTop - 8} textAnchor="middle" className="frame-dim-label">
          {width} PX WIDE
        </text>

        {/* extension lines: left */}
        <line x1={rectX - extOver} y1={rectY} x2={rectX - dimOffsetLeft - extGap} y2={rectY} className="frame-ext" />
        <line
          x1={rectX - extOver}
          y1={rectY + rectH}
          x2={rectX - dimOffsetLeft - extGap}
          y2={rectY + rectH}
          className="frame-ext"
        />
        {/* dimension line: left (height) */}
        <line
          x1={rectX - dimOffsetLeft}
          y1={rectY}
          x2={rectX - dimOffsetLeft}
          y2={rectY + rectH}
          className="frame-dim"
          markerStart="url(#tick)"
          markerEnd="url(#tick)"
        />
        <text
          x={0}
          y={0}
          transform={`translate(${rectX - dimOffsetLeft - 8} ${rectY + rectH / 2}) rotate(-90)`}
          textAnchor="middle"
          className="frame-dim-label"
        >
          {height} PX TALL
        </text>

        {/* the viewport rectangle itself */}
        <rect x={rectX} y={rectY} width={rectW} height={rectH} className="frame-rect" />
        <path d={`M${rectX} ${rectY}h10M${rectX} ${rectY}v10`} className="frame-corner" />
        <path d={`M${rectX + rectW} ${rectY}h-10M${rectX + rectW} ${rectY}v10`} className="frame-corner" />
        <path d={`M${rectX} ${rectY + rectH}h10M${rectX} ${rectY + rectH}v-10`} className="frame-corner" />
        <path d={`M${rectX + rectW} ${rectY + rectH}h-10M${rectX + rectW} ${rectY + rectH}v-10`} className="frame-corner" />

        {/* breakpoint stamp, bottom-left inside the drawing area */}
        <text x={PAD_LEFT} y={BOX_H - 8} className="frame-stamp">
          BREAKPOINT&nbsp;/&nbsp;{breakpoint.name.toUpperCase()}
        </text>
        {/* scale ratio, bottom-right */}
        <text x={BOX_W - PAD_RIGHT} y={BOX_H - 8} textAnchor="end" className="frame-stamp">
          SCALE {scaleLabel}
        </text>

        <defs>
          <marker id="tick" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M4 0v8" className="frame-tick" />
          </marker>
        </defs>
      </svg>
      <figcaption className="frame-caption">
        Live viewport, drawn to scale — resize the window to update.
      </figcaption>
    </figure>
  )
}
