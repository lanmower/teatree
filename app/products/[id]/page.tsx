import { use } from "react"
import productsData from "@/content/products.json"
import { ProductDetailClient } from "./client"

export function generateStaticParams() {
  return productsData.products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <ProductDetailClient id={id} />
}
