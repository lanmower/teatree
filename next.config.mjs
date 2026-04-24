/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/teatree',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
}

export default nextConfig
