"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import productsData from "@/content/products.json"

export function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured")
  const [showFilters, setShowFilters] = useState(false)

  const allBenefits = useMemo(() => {
    const benefits = new Set<string>()
    productsData.products.forEach(p => {
      if (p.benefits) {
        p.benefits.forEach(b => benefits.add(b))
      }
    })
    return Array.from(benefits).sort()
  }, [])

  const filteredProducts = useMemo(() => {
    let products = [...productsData.products]

    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory)
    }

    if (selectedBenefits.length > 0) {
      products = products.filter((p) =>
        selectedBenefits.some((benefit) =>
          p.benefits?.includes(benefit)
        )
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.benefits?.some((b) => b.toLowerCase().includes(query)) ||
          p.sourcing?.toLowerCase().includes(query)
      )
    }

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
  }, [selectedCategory, selectedBenefits, searchQuery, sortBy])

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit]
    )
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedBenefits([])
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategory || selectedBenefits.length > 0 || searchQuery

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
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

          <section className="py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* Search Bar */}
              <div className="mb-8 pb-8 border-b border-border">
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
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <div className="flex items-center justify-between mb-6 lg:mb-0">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </h2>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6 mt-4 lg:mt-6">
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-3">Category</h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCategory === null ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(null)}
                        >
                          All Products
                        </Button>
                        {productsData.categories.map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Benefits Filter */}
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-3">Benefits</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {allBenefits.map((benefit) => (
                          <label key={benefit} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedBenefits.includes(benefit)}
                              onChange={() => toggleBenefit(benefit)}
                              className="rounded border-border"
                            />
                            <span className="text-sm text-foreground">{benefit}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold text-sm text-foreground mb-3">Sort By</h3>
                      <select
                        className="w-full text-sm bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
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
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6 lg:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                    {selectedCategory && (
                      <> in {productsData.categories.find((c) => c.id === selectedCategory)?.name}</>
                    )}
                    {selectedBenefits.length > 0 && (
                      <> with {selectedBenefits.join(", ")}</>
                    )}
                  </p>

                  {/* Active Filter Tags */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border">
                      {searchQuery && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: {searchQuery}
                          <button onClick={() => setSearchQuery("")} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {productsData.categories.find((c) => c.id === selectedCategory)?.name}
                          <button onClick={() => setSelectedCategory(null)} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedBenefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="flex items-center gap-1">
                          {benefit}
                          <button onClick={() => toggleBenefit(benefit)} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {filteredProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-lg text-muted-foreground mb-4">
                        No products found matching your criteria.
                      </p>
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </CartProvider>
  )
}
