"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              href="/services"
              className="text-xs lg:text-sm uppercase tracking-widest text-white hover:text-white transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
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
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white hover:text-white py-3 transition-colors touch-manipulation"
              >
                Services
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
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

      {/* Services Content */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 sm:mb-10 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 md:mb-10">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-12 sm:mb-14 md:mb-16 max-w-3xl leading-relaxed">
            ZeroRender offers comprehensive digital solutions to help small businesses establish a strong online presence,
            automate workflows, and scale with confidence.
          </p>

          {/* Services Grid */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {/* Web Design & Development */}
            <div className="border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                Web Design & Development
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                Custom, responsive websites built with modern technologies that prioritize speed, accessibility, and user
                experience.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Custom website design (1-12 pages)",
                  "Fully responsive & mobile-optimized",
                  "Fast loading times & SEO optimization",
                  "Domain setup & configuration",
                  "Content management system integration",
                  "Contact forms & navigation setup",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Identity */}
            <div className="border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                Brand Identity & Design
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                Complete branding solutions that create a cohesive visual identity across all touchpoints.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Professional logo design (multiple concepts)",
                  "Complete brand kit (colors, fonts, guidelines)",
                  "Social media profile images & banners",
                  "Branded social media templates (10-30 templates)",
                  "Business card & digital card design",
                  "Brand handbook & style guide (PDF)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Integration */}
            <div className="border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                AI Integration & Automation
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                Intelligent automation tools that streamline operations and enhance customer engagement.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "AI chatbot installation & configuration",
                  "Smart inquiry form with auto-sorting",
                  "AI-powered CRM setup",
                  "Automated sales funnel creation",
                  "Email newsletter template design",
                  "Appointment booking system setup",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content & Copywriting */}
            <div className="border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                Content & Copywriting
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                Professional copywriting and content creation that communicates your value proposition effectively.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Full website copywriting",
                  "SEO-optimized blog posts (3+ posts)",
                  "Email newsletter templates",
                  "Social media content strategy",
                  "Product/service descriptions",
                  "About page & company story",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ongoing Support */}
            <div className="border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                Ongoing Support & Maintenance
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                Continuous support to keep your digital presence running smoothly and up-to-date.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "7-60 days of post-launch support (varies by package)",
                  "Website updates & revisions",
                  "Technical troubleshooting",
                  "Performance monitoring",
                  "Security updates",
                  "Priority support channels",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 sm:mt-20 md:mt-24 text-center border border-white/20 p-8 sm:p-10 md:p-12 bg-white/5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              View our service packages or contact us for a custom quote tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#packages"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-zinc-900 hover:text-white border border-white transition-all duration-300 font-semibold text-sm sm:text-base uppercase tracking-wider"
              >
                View Packages
              </Link>
              <Link
                href="/#contact"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white hover:bg-white hover:text-black border border-white transition-all duration-300 font-semibold text-sm sm:text-base uppercase tracking-wider"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
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
                    href="/services"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    About
                  </Link>
                </li>
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

