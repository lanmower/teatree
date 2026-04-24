import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { CartContent } from "@/components/cart-content"

export default function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
          <section className="bg-muted/30 border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
              <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Shopping Cart
              </h1>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <CartContent />
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </CartProvider>
  )
}
