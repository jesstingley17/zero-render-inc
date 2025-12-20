"use client"

import { useEffect, useRef } from "react"

interface OptimizedBlogContentProps {
  content: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Component that ensures images in blog content render correctly
 * The content is already processed by rewriteHubSpotContent which handles
 * URL rewriting and Next.js image optimization
 */
export function OptimizedBlogContent({ content, className, style }: OptimizedBlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Find all img tags in the content
    const images = containerRef.current.querySelectorAll("img")
    
    images.forEach((img) => {
      // Ensure images have proper styling
      if (!img.style.maxWidth) {
        img.style.maxWidth = "100%"
        img.style.height = "auto"
      }
      
      // Add error handling
      img.onerror = function() {
        console.error("Failed to load image:", img.src)
        // Keep the image but log the error
      }
    })
  }, [content])

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

