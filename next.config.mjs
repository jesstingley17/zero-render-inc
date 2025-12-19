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
    ],
    // Use CDN for optimized images if configured
    loader: process.env.NEXT_PUBLIC_CDN_URL ? 'custom' : 'default',
    loaderFile: process.env.NEXT_PUBLIC_CDN_URL ? './lib/image-loader.js' : undefined,
    // Allow images from CDN domain and HubSpot reverse proxy
    domains: process.env.NEXT_PUBLIC_CDN_URL 
      ? ['cdn.zero-render.com', 'zero-render.com', 'www.zero-render.com', 'blog.zero-render.com']
      : ['blog.zero-render.com'],
  },
  // Enable static page generation where possible
  output: 'standalone',
}

export default nextConfig