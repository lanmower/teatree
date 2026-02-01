"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <Image
              src="/teatree/images/logo.png"
              alt="Tea Tree Essentials"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-semibold text-foreground">Tea Tree Essentials</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">South Africa</p>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
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

            {/* Floating Cart Preview */}
            {showCartPreview && itemCount > 0 && (
              <div className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-xl z-50">
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
                        <p className="text-xs text-muted-foreground mt-1">{item.quantity}x ${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-foreground">Total:</span>
                    <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
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
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-foreground/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
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
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/cart"
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold text-foreground hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Cart {itemCount > 0 && `(${itemCount})`}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
