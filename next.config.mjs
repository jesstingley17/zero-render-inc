/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable compression
  compress: true,
  // Optimize JavaScript bundles
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'lucide-react',
    ],
  },
  // Optimize images
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.bannerbear.com',
      },
      // HubSpot domains
      {
        protocol: 'https',
        hostname: 'cdn2.hubspot.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hubspot.com',
      },
      {
        protocol: 'https',
        hostname: '*.hubspotusercontent*.net',
      },
      {
        protocol: 'https',
        hostname: '*.hs-sites.com',
      },
      {
        protocol: 'https',
        hostname: '*.hs-sitescontent.com',
      },
    ],
    // Optimize images for better performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Limit image quality to reduce file size
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimize headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig