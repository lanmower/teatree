"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

const navigation = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Cart", path: "/cart" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)
  const { items, total, removeItem } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" aria-label="Tea Tree Essentials home">
            <Image
              src="/teatree/images/logo.png"
              alt="Tea Tree Essentials"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-semibold text-foreground">Tea Tree Essentials</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">South Africa</p>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
          >
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.filter(n => n.path !== "/cart").map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="relative bg-transparent"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="ml-2">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Button>

            {showCartPreview && itemCount > 0 && (
              <div
                className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-xl z-50"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Cart Preview</h3>
                  <p className="text-xs text-muted-foreground mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="p-3 border-b border-border/50 last:border-b-0 flex gap-3 items-start">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded h-12 w-12 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.quantity}x {formatPrice(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-foreground">Total:</span>
                    <span className="font-semibold text-foreground">{formatPrice(total)}</span>
                  </div>
                  <Link href="/cart" className="w-full">
                    <Button className="w-full" size="sm">
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/cart">
            <Button size="sm">Checkout</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-foreground/20 transition-opacity duration-200 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border shadow-2xl" style={{ backgroundColor: 'var(--background, #F5F3EE)' }}>
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)} aria-label="Tea Tree Essentials home">
                <Image
                  src="/teatree/images/logo.png"
                  alt="Tea Tree Essentials"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </Link>
              <button
                type="button"
                className="rounded-md p-2.5 text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="space-y-1 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="-mx-3 flex items-center rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.path === "/cart" && itemCount > 0 && (
                      <span className="ml-auto h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
