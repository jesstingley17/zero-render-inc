import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - ZeroRender | AI-Powered Web Design Insights",
  description:
    "Explore insights on AI-powered web design, modern digital experiences, and small business growth. Learn from ZeroRender's expert team about building fast, accessible websites and automated workflows.",
  openGraph: {
    title: "Blog - ZeroRender | AI-Powered Web Design Insights",
    description:
      "Explore insights on AI-powered web design, modern digital experiences, and small business growth. Learn from ZeroRender's expert team about building fast, accessible websites and automated workflows.",
    url: "https://www.zero-render.com/blog",
    siteName: "ZeroRender",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - ZeroRender | AI-Powered Web Design Insights",
    description:
      "Explore insights on AI-powered web design, modern digital experiences, and small business growth. Learn from ZeroRender's expert team about building fast, accessible websites and automated workflows.",
  },
  alternates: {
    canonical: "https://www.zero-render.com/blog/",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

