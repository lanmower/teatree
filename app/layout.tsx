import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

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
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
