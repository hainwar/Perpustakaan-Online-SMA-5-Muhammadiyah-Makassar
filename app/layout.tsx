import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Perpustakaan-Online',
  description: 'Perpustakaan Online',
  generator: 'Hairul Anwar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
