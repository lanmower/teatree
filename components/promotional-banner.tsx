"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface BannerConfig {
  id: string
  type: "seasonal" | "sale" | "featured" | "alert"
  title: string
  message: string
  icon?: string
  cta?: { label: string; path: string }
  backgroundColor: string
  textColor: string
  closeable?: boolean
}

interface PromotionalBannerProps {
  banner: BannerConfig
  onClose?: (id: string) => void
}

export function PromotionalBanner({ banner, onClose }: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.(banner.id)
  }

  if (!isVisible) return null

  return (
    <div
      className={`${banner.backgroundColor} ${banner.textColor} py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {banner.icon && <span className="text-xl flex-shrink-0">{banner.icon}</span>}
          <div className="min-w-0">
            <p className="font-semibold text-sm sm:text-base">{banner.title}</p>
            <p className="text-xs sm:text-sm opacity-90">{banner.message}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {banner.cta && (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="whitespace-nowrap"
            >
              <Link href={banner.cta.path}>{banner.cta.label}</Link>
            </Button>
          )}
          {banner.closeable && (
            <button
              onClick={handleClose}
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
