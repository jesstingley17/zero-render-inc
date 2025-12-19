"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  featuredImage?: string | null
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch with cache headers
        const response = await fetch("/api/hubspot/blog", {
          cache: "force-cache", // Use cached version when available
          next: { revalidate: 300 }, // Revalidate every 5 minutes
        })

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data = await response.json()
        setBlogPosts(data.posts || [])
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="bg-black text-white min-h-screen">
      <BlogHeader />

      {/* Blog Hero */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[96px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 sm:mb-10 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>

          {/* Hero Title */}
          <div className="mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                Insights
              </span>
              <br />
              <span className="text-white">That Drive Growth</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed">
              Expert insights on AI-powered web design, digital marketing, and strategies to scale your business online.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border border-white/10 bg-white/5 animate-pulse"
                >
                  <div className="aspect-video bg-zinc-800" />
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="h-4 w-20 bg-zinc-800 rounded" />
                    <div className="h-8 bg-zinc-800 rounded" />
                    <div className="h-4 bg-zinc-800 rounded" />
                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                    <div className="pt-4 border-t border-white/10">
                      <div className="h-4 bg-zinc-800 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16 sm:py-20 md:py-24">
              <p className="text-lg sm:text-xl text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && !error && blogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col"
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative aspect-video overflow-hidden bg-zinc-900">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white border border-white/30">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    {!post.featuredImage && (
                      <div className="mb-4">
                        <span className="text-xs uppercase tracking-widest text-zinc-500">{post.category}</span>
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 group-hover:text-white transition-colors duration-300 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8 leading-relaxed flex-grow line-clamp-3">
                      {post.excerpt || "Read more..."}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="text-white/70 group-hover:text-white transition-colors">
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="text-center py-16 sm:py-20 md:py-24">
              <p className="text-lg sm:text-xl text-zinc-400">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 mb-16 sm:mb-20 md:mb-24">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 sm:mb-7 md:mb-8 leading-tight">
                Let's Build the
                <br />
                Future Together.
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                Ready to launch or scale your business? Connect with our team.
              </p>
              <div className="flex flex-col space-y-3">
                <a
                  href="tel:+13802662079"
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg md:text-xl text-white hover:text-zinc-300 transition-colors touch-manipulation py-2"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="break-all">+1 (380) 266-2079</span>
                </a>
                <a
                  href="mailto:sales@zero-render.com"
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg md:text-xl text-white hover:text-zinc-300 transition-colors touch-manipulation py-2"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="break-all">sales@zero-render.com</span>
                </a>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-6 sm:mt-8">
                <h4 className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 mb-4">Follow Us</h4>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61585307194709"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/zero_render"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/zerorender-inc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:pl-10">
              <h4 className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 mb-5 sm:mb-6">Sitemap</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
                {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
                  <li key={item}>
                    <a
                      href={`/#${item.toLowerCase()}`}
                      className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 py-6 sm:py-7 md:py-8 text-zinc-500 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} ZeroRender, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
