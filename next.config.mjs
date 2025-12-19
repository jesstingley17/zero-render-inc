/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // CDN Configuration
  // Set NEXT_PUBLIC_CDN_URL=https://cdn.zero-render.com in Vercel environment variables
  // This will serve all static assets (JS, CSS, fonts) from your CDN
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.zero-render.com',
      },
      {
        protocol: 'https',
        hostname: 'zero-render.com',
      },
      {
        protocol: 'https',
        hostname: 'www.zero-render.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.zero-render.com',
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