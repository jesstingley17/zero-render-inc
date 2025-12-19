"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function BlogHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
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
  )
}


