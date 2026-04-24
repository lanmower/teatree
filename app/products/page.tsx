import { Suspense } from "react"
import { ProductsClient } from "./client"

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  )
}
