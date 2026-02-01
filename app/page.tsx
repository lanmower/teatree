import Link from "next/link"
import { Leaf, Globe, Shield, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import productsData from "@/content/products.json"
import configData from "@/content/config.json"

const iconMap = {
  leaf: Leaf,
  globe: Globe,
  shield: Shield,
}

export default function HomePage() {
  const featuredProducts = productsData.products.filter((p) => p.featured)

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                    {configData.hero.title}
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                    {configData.hero.subtitle}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button asChild size="lg">
                      <Link href={configData.hero.cta.primary.path}>
                        {configData.hero.cta.primary.label}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={configData.hero.cta.secondary.path}>
                        {configData.hero.cta.secondary.label}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                    <img
                      src="/teatree/images/logo.png"
                      alt="Tea Tree Essentials Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-card border-y border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {configData.features.map((feature) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap]
                  return (
                    <div
                      key={feature.title}
                      className="flex flex-col items-center text-center p-6"
                    >
                      <div className="rounded-full bg-primary/10 p-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  Featured Products
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover our most popular natural remedies, crafted with care
                  and backed by science.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/products">
                    View All Products
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  What Our Customers Say
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {configData.testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-chart-4 text-chart-4"
                          />
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Ready to Experience Natural Wellness?
              </h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of customers who have discovered the healing power
                of pure tea tree essential oils.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/benefits">Learn More</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </CartProvider>
  )
}
