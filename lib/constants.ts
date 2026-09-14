export type Breakpoint = {
  name: string
  min: number
  max: number
}

/** Tailwind CSS default breakpoint scale. */
export const TAILWIND_BREAKPOINTS: Breakpoint[] = [
  { name: 'xs', min: 0, max: 639 },
  { name: 'sm', min: 640, max: 767 },
  { name: 'md', min: 768, max: 1023 },
  { name: 'lg', min: 1024, max: 1279 },
  { name: 'xl', min: 1280, max: 1535 },
  { name: '2xl', min: 1536, max: Infinity },
]

/** Width used to draw the final (unbounded) ruler segment. */
export const LAST_SEGMENT_WIDTH = 420

export type Device = { name: string; width: number; height: number }

export const COMMON_DEVICES: Device[] = [
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

export function getBreakpoint(width: number): Breakpoint {
  return (
    TAILWIND_BREAKPOINTS.find((bp) => width >= bp.min && width <= bp.max) ??
    TAILWIND_BREAKPOINTS[0]
  )
}

export function getDeviceClass(width: number): 'phone' | 'tablet' | 'laptop' | 'monitor' {
  if (width < 768) return 'phone'
  if (width < 1024) return 'tablet'
  if (width < 1440) return 'laptop'
  return 'monitor'
}
