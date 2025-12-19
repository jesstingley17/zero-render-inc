"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface BlogPost {
  slug: string
  title: string
  content: string
  author: string
  authorAvatar?: string | null
  authorBio?: string
  authorEmail?: string | null
  date: string
  readTime: string
  category: string
  excerpt: string
  featuredImage?: string | null
  url?: string
  metaDescription?: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return

      try {
        setLoading(true)
        // Use the slug as-is, the API will handle URL decoding
        const response = await fetch(`/api/hubspot/blog?slug=${encodeURIComponent(slug)}`)
        const data = await response.json()

        if (!response.ok) {
          // Log debug info if available
          if (data.debug) {
            console.error("Post lookup failed:", data.debug)
          }
          throw new Error(data.error || "Failed to fetch blog post")
        }

        if (data.post) {
          setPost(data.post)
        } else {
          setError(`Post not found: ${slug}`)
        }
      } catch (err) {
        console.error("Error fetching blog post:", err)
        console.error("Slug used:", slug)
        setError(err instanceof Error ? err.message : "Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-zinc-400">Loading post...</p>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-zinc-400 mb-4">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/blog" className="text-white/70 hover:text-white underline">
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-20 flex items-center justify-between">
          <Link href="/" className="block transition-opacity hover:opacity-70 duration-300">
            <img src="/logo_bw_inverted.png" alt="ZeroRender" className="h-7 sm:h-10 md:h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <Link
              href="/blog"
              className="text-xs lg:text-sm uppercase tracking-widest text-white hover:text-white transition-colors duration-300"
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="bg-white text-black hover:bg-zinc-900 hover:text-white rounded-none uppercase tracking-wider text-sm px-4 py-2 transition-colors"
            >
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden text-white p-2 -mr-2 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 sm:top-18 md:top-20 left-0 right-0 bg-black border-b border-white/10 py-6 px-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white hover:text-white py-3 transition-colors touch-manipulation"
              >
                Blog
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white text-black hover:bg-zinc-900 hover:text-white rounded-none uppercase tracking-wider text-base px-6 py-4 mt-2 w-full transition-colors touch-manipulation"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Featured Image Hero */}
      {post.featuredImage && (
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20">
            <div className="container mx-auto max-w-4xl">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 text-xs uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Blog Post Content */}
      <article className={`${post.featuredImage ? 'pt-12 sm:pt-16 md:pt-20' : 'pt-24 sm:pt-28 md:pt-32'} pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8`}>
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 sm:mb-10 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Blog</span>
          </Link>

          {/* Post Header (if no featured image) */}
          {!post.featuredImage && (
            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-zinc-500">{post.category}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 leading-tight">
                {post.title}
              </h1>
            </div>
          )}

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-zinc-400 border-b border-white/10 pb-8 mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Author Profile Section */}
          <div className="mb-8 sm:mb-10 md:mb-12 pb-8 border-b border-white/10">
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-lg">
              <div className="flex items-start gap-4 sm:gap-6">
                {post.authorAvatar ? (
                  <Link
                    href={`/about#${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white/20"
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/about#${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                )}
                <div className="flex-1">
                  <Link
                    href={`/about#${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block group"
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-white transition-colors">
                      {post.author}
                    </h3>
                  </Link>
                  {post.authorBio && (
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-2 sm:mb-3">
                      {post.authorBio}
                    </p>
                  )}
                  {post.authorEmail && (
                    <a
                      href={`mailto:${post.authorEmail}`}
                      className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {post.authorEmail}
                    </a>
                  )}
                  <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                    Published by <span className="text-white font-semibold">{post.author}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div
            className="prose prose-invert max-w-none blog-content mb-12 sm:mb-16 md:mb-20"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: "#e4e4e7",
              fontSize: "1.125rem",
              lineHeight: "1.75",
            }}
          />

          {/* Share Section */}
          <div className="border-t border-b border-white/10 py-8 sm:py-10 mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Enjoyed this article?</h3>
                <p className="text-sm sm:text-base text-zinc-400">Share it with others who might find it valuable.</p>
              </div>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white text-black hover:bg-zinc-900 hover:text-white transition-all duration-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>
          </div>
        </div>
      </article>

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
                  onClick={() =>
                    typeof window !== "undefined" &&
                    (window as any).gtag_report_phone_conversion &&
                    (window as any).gtag_report_phone_conversion("tel:+13802662079")
                  }
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

