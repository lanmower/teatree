"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

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
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    })
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-colors duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Sale
            </Badge>
          )}
          {product.featured && !hasDiscount && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{product.size}</span>
        </div>
        
        <Button
          className="w-full mt-4"
          size="sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
