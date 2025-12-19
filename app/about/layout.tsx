import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zero-render.com"),
  title: "About Us - ZeroRender | Design-Tech Startup for Small Businesses",
  description:
    "Learn about ZeroRender, a design-tech startup empowering small businesses with enterprise-level digital tools. Our mission is to democratize world-class design and technology.",
  openGraph: {
    title: "About Us - ZeroRender | Design-Tech Startup for Small Businesses",
    description:
      "Learn about ZeroRender, a design-tech startup empowering small businesses with enterprise-level digital tools. Our mission is to democratize world-class design and technology.",
    url: "https://www.zero-render.com/about",
    siteName: "ZeroRender",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ZeroRender | Design-Tech Startup for Small Businesses",
    description:
      "Learn about ZeroRender, a design-tech startup empowering small businesses with enterprise-level digital tools.",
  },
  alternates: {
    canonical: "https://www.zero-render.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

