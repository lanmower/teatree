"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

export function CartContent() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const shipping = total >= 50 ? 0 : 5.99
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
        <h2 className="mt-6 font-serif text-2xl font-semibold text-foreground">
          Your cart is empty
        </h2>
        <p className="mt-2 text-muted-foreground">
          Looks like you have not added any products yet.
        </p>
        <Button asChild className="mt-8">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
      <div className="space-y-4" style={{ minWidth: 0 }}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Cart Items ({items.length})
          </h2>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
            Clear All
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                    <p className="mt-1 font-semibold text-foreground">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex items-center border border-input rounded-md">
                      <button className="p-2 hover:bg-muted transition-colors disabled:opacity-50" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button className="p-2 hover:bg-muted transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="font-serif">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Promo code" className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {total < 50 && (
                <p className="text-xs text-primary">
                  Add {formatPrice(50 - total)} more for free shipping!
                </p>
              )}
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{formatPrice(grandTotal)}</span>
            </div>

            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure checkout powered by Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
