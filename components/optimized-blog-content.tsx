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
 * URL rewriting
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
        img.style.display = "block"
      }
      
      // Add error handling with retry
      img.onerror = function() {
        console.error("Failed to load image:", img.src)
        const originalSrc = img.src
        
        // Try to reload after a short delay
        setTimeout(() => {
          if (img.src === originalSrc) {
            img.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + 'retry=' + Date.now()
          }
        }, 1000)
      }
      
      // Ensure image loads
      if (!img.complete) {
        img.loading = "lazy"
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

