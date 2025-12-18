"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
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
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="block transition-opacity hover:opacity-70 duration-300">
          <img src="/logo.png" alt="ZeroRender" className="h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="/portal"
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
          >
            Portal
          </a>
          <Button className="bg-white text-black hover:bg-zinc-900 hover:text-white rounded-none uppercase tracking-wider text-xs px-6">
            Get Started
          </Button>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden">
          {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-white/70 hover:text-white py-2"
            >
              {item}
            </a>
          ))}
          <a href="/portal" className="block text-sm uppercase tracking-widest text-white/70 hover:text-white py-2">
            Portal
          </a>
        </div>
      )}
    </header>
  )
}
