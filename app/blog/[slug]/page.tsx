"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Blog post content - in production, this would come from a CMS or database
const blogPosts: Record<
  string,
  {
    title: string
    content: string
    author: string
    date: string
    readTime: string
    category: string
    excerpt: string
  }
> = {
  "getting-started-with-ai-powered-websites": {
    title: "Getting Started with AI-Powered Websites",
    excerpt:
      "Discover how AI can transform your business website, from automated customer service to personalized user experiences.",
    author: "ZeroRender Team",
    date: "2024-12-15",
    readTime: "5 min read",
    category: "AI & Technology",
    content: `
      <p class="text-lg text-zinc-300 leading-relaxed mb-6">
        Artificial Intelligence is revolutionizing how businesses interact with their customers online. 
        From chatbots that provide instant customer support to personalized content recommendations, 
        AI-powered websites are becoming the standard for modern businesses.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Why AI-Powered Websites Matter</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-4">
        AI-powered websites offer numerous benefits for small businesses:
      </p>
      <ul class="list-disc list-inside space-y-2 text-base text-zinc-300 mb-6 ml-4">
        <li>24/7 customer support through intelligent chatbots</li>
        <li>Personalized user experiences based on visitor behavior</li>
        <li>Automated lead qualification and routing</li>
        <li>Improved conversion rates through smart recommendations</li>
        <li>Reduced operational costs while maintaining quality service</li>
      </ul>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Getting Started</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-4">
        Implementing AI on your website doesn't have to be complicated. Start with these key features:
      </p>
      <ol class="list-decimal list-inside space-y-2 text-base text-zinc-300 mb-6 ml-4">
        <li><strong>Chatbot Integration:</strong> Add an AI chatbot to handle common customer inquiries</li>
        <li><strong>Smart Forms:</strong> Use AI to automatically categorize and route form submissions</li>
        <li><strong>Content Personalization:</strong> Show relevant content based on user preferences</li>
        <li><strong>Analytics & Insights:</strong> Leverage AI to understand user behavior patterns</li>
      </ol>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">The Future is AI</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        As AI technology continues to evolve, businesses that embrace these tools early will have a 
        significant competitive advantage. The key is to start simple and gradually expand your AI 
        capabilities as your business grows.
      </p>
      
      <p class="text-base text-zinc-300 leading-relaxed">
        Ready to transform your website with AI? <a href="/#contact" class="text-white underline hover:text-zinc-300">Contact us</a> to learn how ZeroRender can help you get started.
      </p>
    `,
  },
  "design-trends-2024": {
    title: "Design Trends That Will Shape 2024",
    excerpt: "Explore the latest design trends that are revolutionizing web design and how they can benefit your business.",
    author: "ZeroRender Team",
    date: "2024-12-10",
    readTime: "7 min read",
    category: "Design",
    content: `
      <p class="text-lg text-zinc-300 leading-relaxed mb-6">
        Web design is constantly evolving, and 2024 brings exciting new trends that blend aesthetics 
        with functionality. Here's what's shaping the future of digital design.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Minimalism Meets Bold Typography</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        Clean, minimal designs paired with bold, expressive typography create powerful visual statements 
        that capture attention while maintaining readability.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Dark Mode as Standard</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        Dark mode is no longer optional. Modern websites are designed with dark themes in mind, 
        providing better user experience and reducing eye strain.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Micro-Interactions</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        Subtle animations and micro-interactions enhance user engagement and provide valuable 
        feedback, making websites feel more responsive and polished.
      </p>
    `,
  },
  "small-business-seo-guide": {
    title: "The Complete Small Business SEO Guide",
    excerpt: "Learn essential SEO strategies to help your small business get found online and attract more customers.",
    author: "ZeroRender Team",
    date: "2024-12-05",
    readTime: "10 min read",
    category: "Marketing",
    content: `
      <p class="text-lg text-zinc-300 leading-relaxed mb-6">
        Search Engine Optimization (SEO) is crucial for small businesses looking to compete online. 
        This comprehensive guide covers everything you need to know to improve your search rankings.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Understanding SEO Basics</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        SEO helps your website appear in search results when potential customers search for products 
        or services you offer. The better your SEO, the higher you'll rank, and the more traffic you'll receive.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Key SEO Strategies</h2>
      <ul class="list-disc list-inside space-y-2 text-base text-zinc-300 mb-6 ml-4">
        <li>Optimize your website's loading speed</li>
        <li>Create high-quality, relevant content</li>
        <li>Use proper heading structure (H1, H2, H3)</li>
        <li>Optimize images with alt text</li>
        <li>Build quality backlinks</li>
        <li>Ensure mobile responsiveness</li>
      </ul>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Local SEO for Small Businesses</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        For local businesses, local SEO is essential. Make sure your business is listed on Google 
        Business Profile and other local directories. Include your location in your content and 
        encourage customer reviews.
      </p>
    `,
  },
  "building-brand-identity": {
    title: "Building a Strong Brand Identity on a Budget",
    excerpt: "Practical tips for creating a memorable brand identity without breaking the bank, perfect for startups and small businesses.",
    author: "ZeroRender Team",
    date: "2024-11-28",
    readTime: "6 min read",
    category: "Branding",
    content: `
      <p class="text-lg text-zinc-300 leading-relaxed mb-6">
        A strong brand identity doesn't require a massive budget. With the right approach, you can 
        create a memorable brand that resonates with your audience without overspending.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Define Your Brand Values</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        Start by clearly defining what your brand stands for. What values drive your business? 
        What makes you different? These core principles will guide all your branding decisions.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Consistent Visual Identity</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        Consistency is key. Choose a color palette, typography, and visual style that reflects 
        your brand, and use them consistently across all touchpoints.
      </p>
      
      <h2 class="text-3xl font-bold tracking-tighter mt-8 mb-4">Tell Your Story</h2>
      <p class="text-base text-zinc-300 leading-relaxed mb-6">
        People connect with stories. Share your journey, your mission, and what drives you. 
        Authentic storytelling builds emotional connections with your audience.
      </p>
    `,
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
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

      {/* Blog Post Content */}
      <article className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 sm:mb-10 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Blog</span>
          </Link>

          {/* Post Header */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500">{post.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 sm:mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-zinc-400 border-b border-white/10 pb-6">
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
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: "#e4e4e7",
            }}
          />
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

