/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
  },
}

export default nextConfig