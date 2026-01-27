import { Suspense } from "react"
import { ProductsClient } from "./client"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductsClient />
    </Suspense>
  )
}
