"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import productsData from "@/content/products.json"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured")
  const searchParams = useSearchParams()

  const filteredProducts = useMemo(() => {
    let products = [...productsData.products]

    // Filter by category
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.benefits.some((b) => b.toLowerCase().includes(query))
      )
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return products
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
          {/* Page Header */}
          <section className="bg-muted/30 border-b border-border">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                Our Products
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Explore our collection of pure essential oils and natural
                remedies, each crafted with care and backed by science.
              </p>
            </div>
          </section>

          {/* Filters and Products */}
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* Filter Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8 pb-8 border-b border-border">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>
                  {productsData.categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 ml-auto">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <select
                    className="text-sm bg-transparent border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
                {selectedCategory && (
                  <> in {productsData.categories.find((c) => c.id === selectedCategory)?.name}</>
                )}
              </p>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSelectedCategory(null)
                      setSearchQuery("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </CartProvider>
  )
}

export function Loading() {
  return null
}
