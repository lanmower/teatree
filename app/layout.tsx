import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tea Tree Essentials | Natural Remedies',
  description: 'Premium natural remedies and essential oils crafted from pure tea tree extract. Discover the healing power of nature.',
  keywords: ['tea tree oil', 'natural remedies', 'essential oils', 'organic skincare', 'aromatherapy'],
  openGraph: {
    title: 'Tea Tree Essentials | Natural Remedies',
    description: 'Premium natural remedies and essential oils crafted from pure tea tree extract.',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
