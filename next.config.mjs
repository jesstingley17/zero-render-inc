/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // CDN Configuration - Set NEXT_PUBLIC_CDN_URL in your environment variables
  // Example: NEXT_PUBLIC_CDN_URL=https://cdn.zero-render.com
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Use CDN for optimized images if configured
    loader: process.env.NEXT_PUBLIC_CDN_URL ? 'custom' : 'default',
    loaderFile: process.env.NEXT_PUBLIC_CDN_URL ? './lib/image-loader.js' : undefined,
  },
  // Enable static page generation where possible
  output: 'standalone',
}

export default nextConfig