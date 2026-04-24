import Link from "next/link"
import Image from "next/image"
import { Leaf, Globe, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { LayoutWrapper, PageLayout } from "@/components/layout-wrapper"
import productsData from "@/content/products.json"
import configData from "@/content/config.json"

const features = [
  { icon: Leaf, title: "Pure Natural", desc: "100% natural ingredients" },
  { icon: Globe, title: "Ethically Sourced", desc: "Responsible extraction" },
  { icon: Shield, title: "Quality Assured", desc: "Lab tested and certified" }
]

export default function HomePage() {
  return (
    <CartProvider>
      <PageLayout>
        <SiteHeader />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-background via-muted/20 to-background">
            <LayoutWrapper>
              <div className="grid gap-10 lg:gap-16 auto-rows-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}>
                <div className="flex flex-col justify-center">
                  <div className="inline-block mb-6 w-fit px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Premium Since 2010</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight">
                    {configData.hero.title}
                  </h1>
                  <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {configData.hero.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
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
                <div className="flex items-center justify-center">
                  <Image
                    src="/teatree/images/logo.png"
                    alt="Tea Tree Essentials"
                    width={384}
                    height={384}
                    className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain"
                    priority
                  />
                </div>
              </div>
            </LayoutWrapper>
          </section>

          {/* Features */}
          <section className="py-12 sm:py-16 bg-card border-y border-border">
            <LayoutWrapper>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1.5rem' }}>
                {features.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="text-center p-4">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </LayoutWrapper>
          </section>

          {/* Products */}
          <section className="py-14 sm:py-20">
            <LayoutWrapper>
              <div className="mb-10 sm:mb-16 text-center">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Our Collection</h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Natural remedies crafted with care
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '1.5rem' }}>
                {productsData.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </LayoutWrapper>
          </section>
        </main>
        <SiteFooter />
      </PageLayout>
    </CartProvider>
  )
}
