import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import configData from '@/content/config.json'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `${configData.site.currencySymbol}${price.toFixed(2)}`
}
