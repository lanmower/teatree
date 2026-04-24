import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"

const navigation = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Shopping Cart", href: "/cart" },
  ],
  company: [
    { name: "Home", href: "/" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/teatree/images/logo.png"
                alt="Tea Tree Essentials"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">Tea Tree Essentials</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">South Africa</p>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Premium pharmaceutical-grade tea tree distillates and hydrosols. Pure distillery products from South Africa for skincare, aromatherapy, and wellness applications.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm text-muted-foreground">
              <a
                href="mailto:info@teatreeessentials.co.za"
                className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@teatreeessentials.co.za
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="mt-4 space-y-1">
              {navigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-1">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 lg:mt-12">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Tea Tree Essentials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
