import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@mokabu/database', '@mokabu/server'],
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],
}

export default nextConfig
