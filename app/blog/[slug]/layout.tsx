import type { Metadata } from "next"

// This will be overridden by generateMetadata in page.tsx
export const metadata: Metadata = {
  title: "Blog Post - ZeroRender",
  description: "Read the latest insights from ZeroRender on AI-powered web design and digital experiences.",
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


