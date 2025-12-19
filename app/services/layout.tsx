import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zero-render.com"),
  title: "Services - ZeroRender | Web Design, Branding & AI Integration",
  description:
    "Comprehensive digital services for small businesses: custom web design, brand identity, AI integration, content creation, and ongoing support. Enterprise-level solutions without the complexity.",
  openGraph: {
    title: "Services - ZeroRender | Web Design, Branding & AI Integration",
    description:
      "Comprehensive digital services for small businesses: custom web design, brand identity, AI integration, content creation, and ongoing support.",
    url: "https://www.zero-render.com/services",
    siteName: "ZeroRender",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - ZeroRender | Web Design, Branding & AI Integration",
    description:
      "Comprehensive digital services for small businesses: custom web design, brand identity, AI integration, content creation, and ongoing support.",
  },
  alternates: {
    canonical: "https://www.zero-render.com/services",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

