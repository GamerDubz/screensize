import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ScreenSize — Viewport & Breakpoint Spec Sheet',
  description:
    'A technical spec sheet for your browser viewport: live width and height, Tailwind breakpoint, device pixel ratio, and a device-fit comparison table.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  )
}
