"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface OptimizedBlogContentProps {
  content: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Component that optimizes images in blog content HTML
 * Converts regular img tags to use Next.js Image optimization
 */
export function OptimizedBlogContent({ content, className, style }: OptimizedBlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Find all img tags in the content
    const images = containerRef.current.querySelectorAll("img")
    
    images.forEach((img) => {
      const src = img.getAttribute("src")
      if (!src) return

      // Skip if already processed
      if (img.dataset.optimized === "true") return

      // Get natural dimensions or use defaults
      const width = img.getAttribute("width") || img.naturalWidth || 800
      const height = img.getAttribute("height") || img.naturalHeight || 600

      // Create a wrapper div for Next.js Image
      const wrapper = document.createElement("div")
      wrapper.className = "relative w-full my-8"
      wrapper.style.aspectRatio = `${width} / ${height}`
      wrapper.style.maxHeight = "600px"
      wrapper.style.overflow = "hidden"

      // Create Next.js optimized image
      const optimizedImg = document.createElement("img")
      optimizedImg.src = src
      optimizedImg.alt = img.getAttribute("alt") || ""
      optimizedImg.className = "w-full h-full object-contain"
      optimizedImg.loading = "lazy"
      optimizedImg.decoding = "async"

      // Add width and height to prevent layout shift
      optimizedImg.width = Number(width)
      optimizedImg.height = Number(height)

      // Replace original img with optimized version
      img.parentNode?.replaceChild(wrapper, img)
      wrapper.appendChild(optimizedImg)

      // Mark as processed
      optimizedImg.dataset.optimized = "true"
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

