"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "./ui/button"
import { ContactDialog } from "./ContactDialog"

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
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
        <a href="#" className="block transition-opacity hover:opacity-70 duration-300">
          <img src="/logo.png" alt="ZeroRender" className="h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            >
              <span className="relative">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
          <a
            href="/portal"
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
          >
            <span className="relative">
              Portal
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
          <Button
            onClick={() => setIsContactOpen(true)}
            className="bg-white text-black hover:bg-zinc-900 hover:text-white hover:border-white border border-transparent rounded-none uppercase tracking-wider text-xs px-6 transition-all duration-300"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-zinc-400 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden flex flex-col space-y-4"
          >
            {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white block py-2 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href="/portal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white block py-2 transition-colors duration-300"
            >
              Portal
            </a>
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsContactOpen(true)
              }}
              className="w-full bg-white text-black hover:bg-zinc-900 hover:text-white hover:border-white border border-transparent rounded-none uppercase tracking-wider text-xs transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </header>
  )
}
