"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star, Check, Minus, Plus, ShoppingBag } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider, useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import productsData from "@/content/products.json"

function ProductDetailContent({ id }: { id: string }) {
  const product = productsData.products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, items, total } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const savings = hasDiscount ? product.originalPrice! - product.price : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
      })
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setShowBuyModal(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Detail */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {hasDiscount && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1">
                    Save ${savings.toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">
                    {productsData.categories.find((c) => c.id === product.category)?.name}
                  </span>
                  <span>|</span>
                  <span>{product.size}</span>
                </div>

                <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-chart-4 text-chart-4"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice?.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="text-primary">
                        {Math.round((savings / product.originalPrice!) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Key Benefits
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {product.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-input rounded-md">
                    <button
                      className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      className="p-3 hover:bg-muted transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-1 gap-3">
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Added!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>

                {!product.inStock && (
                  <p className="mt-4 text-destructive text-sm">
                    This product is currently out of stock.
                  </p>
                )}

                {/* Stock Status */}
                {product.inStock && (
                  <p className="mt-4 text-sm text-primary flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    In Stock - Ships within 24 hours
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-muted/30 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                You May Also Like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />

      {/* Buy Now Modal */}
      <Dialog open={showBuyModal} onOpenChange={setShowBuyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Review your order and proceed to checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {total >= 50 ? "Free" : "$5.99"}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">
                  ${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
              {total < 50 && (
                <p className="text-xs text-muted-foreground">
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBuyModal(false)}
              className="sm:flex-1"
            >
              Continue Shopping
            </Button>
            <Link href="/cart" className="sm:flex-1">
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function ProductDetailClient({ id }: { id: string }) {
  return (
    <CartProvider>
      <ProductDetailContent id={id} />
    </CartProvider>
  )
}
