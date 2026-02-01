import Link from "next/link"
import { Leaf, Globe, Shield, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { PromotionalBanner } from "@/components/promotional-banner"
import productsData from "@/content/products.json"
import configData from "@/content/config.json"

const iconMap = {
  leaf: Leaf,
  globe: Globe,
  shield: Shield,
}

export default function HomePage() {
  const featuredProducts = productsData.products.filter((p) => p.featured && !p.seasonal)
  const seasonalProducts = productsData.products.filter((p) => p.seasonal)

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {/* Promotional Banner */}
        <PromotionalBanner
          banner={{
            id: "seasonal-banner",
            type: "seasonal",
            icon: "❄️",
            title: "Seasonal Collection Now Available",
            message: "Discover our limited-edition seasonal blends crafted for the current season.",
            cta: { label: "Shop Seasonal", path: "/products?category=seasonal" },
            backgroundColor: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
            textColor: "text-foreground",
            closeable: true,
          }}
        />

        <SiteHeader />

        <main className="flex-1">
          {/* Enhanced Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 1200 600">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="1200" height="600" fill="url(#grid)" />
              </svg>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Premium Quality Since 2010</span>
                  </div>
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

                  {/* Trust Badges */}
                  <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-border/50">
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">⭐ 4.8 Average Rating</p>
                      <p className="text-muted-foreground">From 47+ customer reviews</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">🚚 Fast Shipping</p>
                      <p className="text-muted-foreground">2-3 business days</p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
                    <img
                      src="/teatree/images/logo.png"
                      alt="Tea Tree Essentials Logo"
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
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
                      className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                    >
                      <div className="rounded-full bg-primary/10 p-4 mb-4 group hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">
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

          {/* Seasonal Picks Section */}
          {seasonalProducts.length > 0 && (
            <section className="py-20 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-y border-amber-200/30">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-block mb-4">
                    <span className="text-4xl">🌟</span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    Seasonal Picks
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Discover our exclusive limited-edition seasonal collections,
                    carefully crafted for the current season.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 justify-items-center mb-12">
                  {seasonalProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="text-center">
                  <Button asChild size="lg">
                    <Link href="/products?category=seasonal">
                      Shop All Seasonal Products
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Educational Content Section */}
          <section className="py-20 bg-muted/20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl mb-6">
                    Tea Tree Brewing & Care Guide
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                          <span className="text-xl">🌿</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Proper Storage</h3>
                        <p className="text-muted-foreground mt-1">
                          Store all products in cool, dark places away from direct sunlight to maintain potency.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                          <span className="text-xl">💧</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Dilution Instructions</h3>
                        <p className="text-muted-foreground mt-1">
                          Always dilute essential oils with carrier oils before skin application. Use 2-3 drops per teaspoon of carrier oil.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                          <span className="text-xl">🫧</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Aromatherapy Use</h3>
                        <p className="text-muted-foreground mt-1">
                          Use 5-10 drops in a diffuser with water. Never apply concentrated oils directly to skin.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                          <span className="text-xl">⏱️</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Usage Duration</h3>
                        <p className="text-muted-foreground mt-1">
                          Limit aromatherapy sessions to 30 minutes at a time. Take breaks between sessions for best results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100/40 to-teal-100/40 rounded-xl p-8 border border-green-200/30">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Quick Start Guide</h3>
                  <div className="space-y-4 text-sm">
                    <div className="bg-white/50 rounded-lg p-4 border border-green-200/20">
                      <p className="font-semibold text-foreground mb-2">For Skin Care:</p>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        <li>Patch test on small area first</li>
                        <li>Always dilute with carrier oil</li>
                        <li>Use 2-3 drops per application</li>
                        <li>Apply 1-2 times daily</li>
                      </ol>
                    </div>

                    <div className="bg-white/50 rounded-lg p-4 border border-green-200/20">
                      <p className="font-semibold text-foreground mb-2">For Aromatherapy:</p>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        <li>Fill diffuser with water</li>
                        <li>Add 5-10 drops of oil</li>
                        <li>Run for 30 minutes</li>
                        <li>Repeat as needed</li>
                      </ol>
                    </div>

                    <div className="bg-white/50 rounded-lg p-4 border border-green-200/20">
                      <p className="font-semibold text-foreground mb-2">Storage Tips:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Keep in dark glass bottles</li>
                        <li>Store below 25°C (77°F)</li>
                        <li>Keep away from children & pets</li>
                        <li>Check expiry dates regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Indicators Section */}
          <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  Why Trust Tea Tree Essentials
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our commitment to quality, sustainability, and transparency
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/50 border-blue-200/30 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">🏆</div>
                    <h3 className="font-semibold text-foreground mb-2">GMP Certified</h3>
                    <p className="text-sm text-muted-foreground">
                      Manufactured under Good Manufacturing Practices standards for safety and quality.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 border-blue-200/30 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">🌍</div>
                    <h3 className="font-semibold text-foreground mb-2">Sustainably Sourced</h3>
                    <p className="text-sm text-muted-foreground">
                      Ethically harvested from South African tea tree farms with environmental responsibility.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 border-blue-200/30 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">✅</div>
                    <h3 className="font-semibold text-foreground mb-2">Third-Party Tested</h3>
                    <p className="text-sm text-muted-foreground">
                      Every batch is independently tested for purity and potency by accredited labs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 border-blue-200/30 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">💚</div>
                    <h3 className="font-semibold text-foreground mb-2">100% Pure</h3>
                    <p className="text-sm text-muted-foreground">
                      No additives, fillers, or synthetic ingredients. Just pure tea tree from nature.
                    </p>
                  </CardContent>
                </Card>
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
                <p className="mt-4 text-muted-foreground">
                  Trusted by thousands of customers worldwide
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {configData.testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="bg-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-chart-4 text-chart-4"
                          />
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed font-serif text-lg">
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
          <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Ready to Experience Natural Wellness?
              </h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of customers who have discovered the healing power
                of pure tea tree essential oils and distillates.
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
                  <Link href="/cart">Get Started</Link>
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
