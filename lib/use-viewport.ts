import { useSyncExternalStore } from 'react'

export type ViewportSize = { width: number; height: number }

const SERVER_VIEWPORT_SNAPSHOT: ViewportSize = { width: 0, height: 0 }
let viewportSnapshot: ViewportSize = SERVER_VIEWPORT_SNAPSHOT

function getViewportSnapshot(): ViewportSize {
  const width = window.innerWidth
  const height = window.innerHeight
  if (viewportSnapshot.width !== width || viewportSnapshot.height !== height) {
    viewportSnapshot = { width, height }
  }
  return viewportSnapshot
}

function getServerViewportSnapshot(): ViewportSize {
  return SERVER_VIEWPORT_SNAPSHOT
}

function subscribeToViewport(onChange: () => void) {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

/** Tracks the live browser viewport size, updating on resize. */
export function useViewport(): ViewportSize {
  return useSyncExternalStore(subscribeToViewport, getViewportSnapshot, getServerViewportSnapshot)
}

export type ScreenInfo = {
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  colorDepth: number
  orientation: 'landscape' | 'portrait'
  touchSupport: boolean
  darkMode: boolean
  online: boolean
}

const SERVER_SCREEN_INFO: ScreenInfo = {
  screenWidth: 0,
  screenHeight: 0,
  pixelRatio: 1,
  colorDepth: 24,
  orientation: 'landscape',
  touchSupport: false,
  darkMode: false,
  online: true,
}

let screenInfoSnapshot: ScreenInfo = SERVER_SCREEN_INFO

function readScreenInfo(): ScreenInfo {
  return {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth,
    orientation: window.screen.width > window.screen.height ? 'landscape' : 'portrait',
    touchSupport: 'ontouchstart' in window,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    online: navigator.onLine,
  }
}

function hasScreenInfoChanged(a: ScreenInfo, b: ScreenInfo): boolean {
  return (
    a.screenWidth !== b.screenWidth ||
    a.screenHeight !== b.screenHeight ||
    a.pixelRatio !== b.pixelRatio ||
    a.colorDepth !== b.colorDepth ||
    a.orientation !== b.orientation ||
    a.touchSupport !== b.touchSupport ||
    a.darkMode !== b.darkMode ||
    a.online !== b.online
  )
}

function getScreenInfoSnapshot(): ScreenInfo {
  const next = readScreenInfo()
  if (hasScreenInfoChanged(next, screenInfoSnapshot)) {
    screenInfoSnapshot = next
  }
  return screenInfoSnapshot
}

function getServerScreenInfoSnapshot(): ScreenInfo {
  return SERVER_SCREEN_INFO
}

function subscribeToScreenInfo(onChange: () => void) {
  const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  window.addEventListener('resize', onChange)
  window.addEventListener('online', onChange)
  window.addEventListener('offline', onChange)
  darkModeMedia.addEventListener('change', onChange)
  return () => {
    window.removeEventListener('resize', onChange)
    window.removeEventListener('online', onChange)
    window.removeEventListener('offline', onChange)
    darkModeMedia.removeEventListener('change', onChange)
  }
}

/** Reads live device/screen characteristics (pixel ratio, color depth, orientation, etc). */
export function useScreenInfo(): ScreenInfo {
  return useSyncExternalStore(subscribeToScreenInfo, getScreenInfoSnapshot, getServerScreenInfoSnapshot)
}
