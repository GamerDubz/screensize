'use client'

import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, Monitor, Smartphone, Tablet, Laptop } from 'lucide-react'

type Breakpoint = { name: string; min: number; max: number; color: string }

const TAILWIND_BREAKPOINTS: Breakpoint[] = [
  { name: 'xs', min: 0, max: 639, color: '#94a3b8' },
  { name: 'sm', min: 640, max: 767, color: '#34d399' },
  { name: 'md', min: 768, max: 1023, color: '#60a5fa' },
  { name: 'lg', min: 1024, max: 1279, color: '#a78bfa' },
  { name: 'xl', min: 1280, max: 1535, color: '#f472b6' },
  { name: '2xl', min: 1536, max: Infinity, color: '#fb923c' },
]

const COMMON_DEVICES = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
  { name: 'iPad mini', width: 768, height: 1024 },
  { name: 'iPad Pro 11"', width: 1024, height: 1366 },
  { name: 'MacBook Air 13"', width: 1280, height: 800 },
  { name: 'MacBook Pro 14"', width: 1512, height: 982 },
  { name: 'Full HD 1080p', width: 1920, height: 1080 },
  { name: '2K QHD', width: 2560, height: 1440 },
  { name: '4K UHD', width: 3840, height: 2160 },
]

function getDeviceIcon(width: number) {
  if (width < 768) return Smartphone
  if (width < 1024) return Tablet
  if (width < 1440) return Laptop
  return Monitor
}

function getBreakpoint(width: number): Breakpoint {
  return TAILWIND_BREAKPOINTS.find((bp) => width >= bp.min && width <= bp.max) ?? TAILWIND_BREAKPOINTS[0]
}

function useViewport() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return viewport
}

function useScreenInfo() {
  const [info, setInfo] = useState({
    screenWidth: 0, screenHeight: 0,
    pixelRatio: 1, colorDepth: 24,
    orientation: 'landscape', touchSupport: false,
    darkMode: false, online: true,
  })
  useEffect(() => {
    setInfo({
      screenWidth: screen.width, screenHeight: screen.height,
      pixelRatio: window.devicePixelRatio ?? 1,
      colorDepth: screen.colorDepth,
      orientation: screen.width > screen.height ? 'landscape' : 'portrait',
      touchSupport: 'ontouchstart' in window,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      online: navigator.onLine,
    })
  }, [])
  return info
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-white/10 transition-colors" aria-label="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
    </button>
  )
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-bold tabular-nums" style={{ color: accent ?? '#f5f5f5' }}>{value}</span>
      {sub && <span className="text-xs text-neutral-600">{sub}</span>}
    </div>
  )
}

export default function ScreenSizePage() {
  const { width, height } = useViewport()
  const screen = useScreenInfo()
  const bp = getBreakpoint(width)
  const DeviceIcon = getDeviceIcon(width)

  const summaryText = `Viewport: ${width}×${height} | Breakpoint: ${bp.name} | DPR: ${screen.pixelRatio} | Screen: ${screen.screenWidth}×${screen.screenHeight}`

  return (
    <div className="min-h-full bg-[#0f0f0f] text-neutral-100 p-6 md:p-10">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Monitor className="w-5 h-5 text-neutral-400" />
          <h1 className="text-xl font-semibold tracking-tight">ScreenSize</h1>
        </div>
        <p className="text-sm text-neutral-500">Real-time viewport inspector & breakpoint detector</p>
      </header>

      {/* Hero — live viewport size */}
      <div
        className="rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6"
        style={{ background: `linear-gradient(135deg, ${bp.color}15, transparent)`, border: `1px solid ${bp.color}30` }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <DeviceIcon className="w-5 h-5" style={{ color: bp.color }} />
            <span className="text-sm font-medium" style={{ color: bp.color }}>Tailwind `{bp.name}` breakpoint</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-black tabular-nums" style={{ color: bp.color }}>{width}</span>
            <span className="text-3xl font-light text-neutral-500">×</span>
            <span className="text-6xl font-black tabular-nums text-neutral-300">{height}</span>
            <span className="text-lg text-neutral-500 ml-1">px</span>
          </div>
          <p className="text-sm text-neutral-500 mt-2">Viewport size · updates live as you resize</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-mono">{summaryText}</span>
          <CopyButton text={summaryText} />
        </div>
      </div>

      {/* Breakpoint bar */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Tailwind CSS Breakpoints</h2>
        <div className="flex rounded-lg overflow-hidden border border-[#2e2e2e] text-xs font-mono">
          {TAILWIND_BREAKPOINTS.map((b) => (
            <div
              key={b.name}
              className="flex-1 py-2.5 text-center transition-all"
              style={{
                background: b.name === bp.name ? `${b.color}25` : 'transparent',
                color: b.name === bp.name ? b.color : '#555',
                borderRight: '1px solid #2e2e2e',
                fontWeight: b.name === bp.name ? 700 : 400,
              }}
            >
              {b.name}
            </div>
          ))}
        </div>
        <div className="mt-1.5 text-xs text-neutral-600 flex gap-4 flex-wrap">
          {TAILWIND_BREAKPOINTS.map((b) => (
            <span key={b.name}>
              <span style={{ color: b.color }}>{b.name}:</span> {b.min === 0 ? '0' : `${b.min}px`}
              {b.max !== Infinity ? `–${b.max}px` : '+'}
            </span>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Viewport Width" value={`${width}px`} accent={bp.color} />
        <StatCard label="Viewport Height" value={`${height}px`} />
        <StatCard label="Device Pixel Ratio" value={`${screen.pixelRatio}×`} sub="Retina" />
        <StatCard label="Color Depth" value={`${screen.colorDepth}-bit`} />
        <StatCard label="Screen Resolution" value={`${screen.screenWidth}×${screen.screenHeight}`} sub="Physical pixels" />
        <StatCard label="Orientation" value={screen.orientation} />
        <StatCard label="Touch Support" value={screen.touchSupport ? 'Yes' : 'No'} />
        <StatCard label="Prefers Dark" value={screen.darkMode ? 'Yes' : 'No'} />
      </div>

      {/* Device comparison */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Device Comparison</h2>
        <div className="grid gap-2">
          {COMMON_DEVICES.map((dev) => {
            const fits = width >= dev.width
            const DevIcon = getDeviceIcon(dev.width)
            return (
              <div
                key={dev.name}
                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg px-4 py-3"
              >
                <DevIcon className="w-4 h-4 text-neutral-600 shrink-0" />
                <span className="flex-1 text-sm text-neutral-300">{dev.name}</span>
                <span className="text-xs text-neutral-500 font-mono">{dev.width}×{dev.height}</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{
                    background: fits ? '#16a34a20' : '#dc262620',
                    color: fits ? '#4ade80' : '#f87171',
                  }}
                >
                  {fits ? '✓ Fits' : '✕ Too wide'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
