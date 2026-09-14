import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f2f5f8',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
          <path
            d="M5 12V7a2 2 0 0 1 2-2h5"
            stroke="#1957e0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 20v5a2 2 0 0 1-2 2h-5"
            stroke="#1957e0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10.5 21.5 21.5 10.5" stroke="#1957e0" strokeWidth="2.6" strokeLinecap="round" />
          <path
            d="M16 10 21.5 10.5 22 16"
            stroke="#1957e0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 22 10.5 21.5 10 16"
            stroke="#1957e0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
