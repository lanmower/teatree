"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star, Minus, Plus, ShoppingBag } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider, useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutWrapper, PageLayout } from "@/components/layout-wrapper"
import productsData from "@/content/products.json"
import { formatPrice } from "@/lib/utils"

function ProductDetailContent({ id }: { id: string }) {
  const product = productsData.products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) notFound()

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const savings = hasDiscount ? product.originalPrice! - product.price : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image, size: product.size })
    }
  }

  return (
    <PageLayout>
      <SiteHeader />
      <main className="flex-1">
        <LayoutWrapper>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mt-4 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />Back
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
              {hasDiscount && <Badge className="absolute top-4 left-4">Save {formatPrice(savings)}</Badge>}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{productsData.categories.find((c) => c.id === product.category)?.name}</span>
                <span>|</span>
                <span>{product.size}</span>
              </div>

              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={i < Math.floor(product.rating) ? "fill-chart-4 text-chart-4 h-4 w-4" : "h-4 w-4 text-muted-foreground"} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {hasDiscount && <span className="text-lg line-through text-muted-foreground">{formatPrice(product.originalPrice!)}</span>}
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                {product.benefits && (
                  <div>
                    <h3 className="font-semibold mb-2">Benefits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {product.benefits.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center border border-input rounded-md w-fit">
                    <button className="p-2 hover:bg-muted" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button className="p-2 hover:bg-muted" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button size="lg" onClick={handleAddToCart} className="gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </LayoutWrapper>

        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-border mt-16">
            <LayoutWrapper>
              <h2 className="font-serif text-2xl font-bold mb-8">Related Products</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </LayoutWrapper>
          </section>
        )}
      </main>
      <SiteFooter />
    </PageLayout>
  )
}

export default function ProductDetailPage({ id }: { id: string }) {
  return (
    <CartProvider>
      <ProductDetailContent id={id} />
    </CartProvider>
  )
}
