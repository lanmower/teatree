"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  shortDescription: string
  size: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
  seasonal?: boolean
  benefits?: string[]
  sourcing?: string
  certifications?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    })
  }

  return (
    <Card className="group overflow-hidden border border-border/50 hover:border-primary/50 active:border-primary/50 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block flex-1" aria-label={`View ${product.name}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay — desktop only, hidden on touch */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center hidden sm:flex">
            <Button
              size="lg"
              className="gap-2 transform -translate-y-3 group-hover:translate-y-0 transition-all duration-300"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.inStock ? "Quick Add" : "Out of Stock"}
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-primary text-primary-foreground">Sale</Badge>
            )}
            {product.featured && !hasDiscount && (
              <Badge variant="secondary">Featured</Badge>
            )}
            {product.seasonal && (
              <Badge className="bg-amber-500 text-white">Seasonal</Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>

        {product.benefits && product.benefits.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.benefits.slice(0, 2).map((benefit) => (
              <Badge key={benefit} variant="outline" className="text-xs">
                {benefit}
              </Badge>
            ))}
            {product.benefits.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{product.benefits.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-center justify-between mb-4 min-w-0">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-lg font-semibold text-foreground shrink-0">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through shrink-0">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground truncate ml-2">{product.size}</span>
        </div>

        <Button
          className="w-full mt-auto"
          size="default"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
