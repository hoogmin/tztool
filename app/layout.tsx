import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import './globals.css'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TZTool | Time Zone Converter',
  description: 'Convert one timezone to another.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inconsolata.className} data-bs-theme="dark">{children}</body>
    </html>
  )
}
