import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"

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
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
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
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:info@teatreeessentials.co.za" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                info@teatreeessentials.co.za
              </a>
              <a href="tel:+27011" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                South Africa
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="mt-4 space-y-3">
              {navigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Tea Tree Essentials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
