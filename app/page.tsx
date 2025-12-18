"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowDown, Mail } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import JobApplicationSection from "@/components/job-application-section"

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      setMessage({ type: "success", text: "Successfully subscribed! Check your inbox for a confirmation email." })
      setEmail("")
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 text-base sm:text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-zinc-900 hover:text-white border border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base uppercase tracking-wider whitespace-nowrap"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 sm:mt-6 p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-200"
              : "bg-red-500/20 border border-red-500/50 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <p className="text-xs sm:text-sm text-zinc-500 mt-4 sm:mt-6 text-center">
        By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
      </p>
    </div>
  )
}

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-black text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-20 flex items-center justify-between">
          <a href="/" className="block transition-opacity hover:opacity-70 duration-300">
            <img src="/logo_bw_inverted.png" alt="ZeroRender" className="h-7 sm:h-10 md:h-12 w-auto" />
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href="/blog"
              className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Blog
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black hover:bg-zinc-900 hover:text-white rounded-none uppercase tracking-wider text-sm px-4 py-2 transition-colors"
            >
              Get Started
            </button>
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
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
                >
                  {item}
                </a>
              ))}
              <a
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
              >
                Blog
              </a>
              <button
                onClick={() => {
                  setIsContactOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="bg-white text-black hover:bg-zinc-900 hover:text-white rounded-none uppercase tracking-wider text-base px-6 py-4 mt-2 w-full transition-colors touch-manipulation"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-white/50 mb-4 sm:mb-5 md:mb-6">
            Future-Proof Digital Solutions
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-7 md:mb-8 leading-[1.1] px-1">
            Design. Intelligence.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Perfection.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-11 md:mb-12 px-1">
            ZeroRender is a design-tech startup building modern, AI-powered digital experiences for small businesses.
            Enterprise-level tools without the complexity or cost.
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12">
          <ArrowDown className="text-white/30 animate-bounce" size={24} />
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 sm:mb-14 md:mb-16 text-center">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {[
              { title: "Web Design", desc: "Beautiful, responsive websites that convert" },
              { title: "Brand Identity", desc: "Cohesive visual systems for your business" },
              { title: "AI Integration", desc: "Smart automation for workflows" },
              { title: "SEO Optimization", desc: "Get found by your ideal customers" },
              { title: "Fast Development", desc: "Launch quickly without sacrificing quality" },
              { title: "Ongoing Support", desc: "We're here when you need us" },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-white/10 p-6 sm:p-7 md:p-8 hover:bg-white/5 transition-colors"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-950">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 sm:mb-14 md:mb-16 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {[
              {
                name: "Starter Website + Domain Setup Package",
                desc: "1-3 Pages",
                features: [
                  "Custom 1-3 page website",
                  "Fully mobile-optimized design",
                  "Domain purchase + full setup",
                  "Clean, modern branded color palette",
                  "Contact form + navigation setup",
                  "1 revision round",
                  "7 days post-launch support",
                  "Full ownership transferred to the client",
                ],
              },
              {
                name: "Business Branding & Website Launch Package",
                desc: "Logo + 5-Page Site",
                features: [
                  "Everything in the Starter Package",
                  "Professional logo design (2 concepts → 1 final)",
                  "Full brand kit (colors, fonts, logo variations)",
                  "Custom 5-page website",
                  "Copywriting assistance for Home / About / Services",
                  "Social media profile image + banner",
                  "10 branded social templates (editable)",
                  "Digital business card design",
                  "14 days of support",
                  "2 revision rounds",
                ],
                featured: true,
              },
              {
                name: "Complete Startup Website & AI Integration Package",
                desc: "Branding + Automations",
                features: [
                  "Everything in the Branding + Website Package",
                  "AI chatbot installation (FAQs + lead capture)",
                  "Smart inquiry form that auto-sorts messages",
                  "Full website copywriting",
                  "3 launch-ready blog posts",
                  "Email newsletter template",
                  "Full social media kit (highlight covers + banners)",
                  "20 branded social templates",
                  "Appointment booking system setup",
                  "Custom thank-you page + invoice template",
                  "30 days of maintenance",
                  "Priority support",
                ],
                featured: true,
              },
              {
                name: "Premium Business Launch Suite",
                desc: "Branding, Website, AI & Graphics Bundle",
                features: [
                  "Everything in the AI Integration Package",
                  "Custom 10-12 page website",
                  "AI-powered CRM setup",
                  "Automated sales funnel (landing → email → booking)",
                  "Merch designs (shirt, sticker, banner)",
                  "Packaging/label design (if applicable)",
                  "Full Brand Handbook (PDF)",
                  "30 branded social templates",
                  "Custom business email setup",
                  "Google Business Profile setup",
                  "2 months of maintenance",
                  "Unlimited revisions during build",
                  "VIP support",
                ],
                featured: true,
              },
              {
                name: "Logo Creation & Mini Branding Kit",
                desc: "No Website Needed",
                features: [
                  "Custom logo (2 concepts → 1 final)",
                  "Mini brand kit (color palette + fonts)",
                  "High-resolution files (PNG/JPG/SVG/PDF)",
                  "Transparent background versions",
                  "Social media profile image",
                  "Full ownership + commercial rights",
                ],
              },
              {
                name: "Graphics Creation Pack",
                desc: "No Website Needed",
                features: [
                  "10 custom branded social templates",
                  "Facebook/Instagram header banner",
                  "Up to 6 story highlight covers",
                  "One promotional flyer or menu design",
                  "Matching color palette + font pairing",
                  "Delivered in PNG + editable formats",
                  "Full rights for business use",
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`border border-white/10 p-6 sm:p-7 md:p-8 ${pkg.featured ? "bg-white/5 ring-1 ring-white/20" : ""} flex flex-col`}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm sm:text-base text-zinc-500 mb-5 sm:mb-6">{pkg.desc}</p>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 mb-6 sm:mb-7 md:mb-8 flex-grow leading-relaxed">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:sales@zero-render.com"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
                      ;(window as any).gtag_report_conversion("mailto:sales@zero-render.com")
                    }
                  }}
                  className="inline-block w-full text-center px-6 py-3.5 sm:py-3 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors touch-manipulation text-sm sm:text-base"
                >
                  Request Quote
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-14 md:mt-16 text-center">
            <div className="border border-white/20 p-8 sm:p-10 md:p-12 bg-white/5 max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Need Something Custom?</h3>
              <p className="text-base sm:text-lg text-zinc-400 mb-6 sm:mb-7 leading-relaxed">
                Every business is unique. Let's build a package that perfectly fits your needs and budget.
              </p>
              <a
                href="mailto:sales@zero-render.com"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
                    ;(window as any).gtag_report_conversion("mailto:sales@zero-render.com")
                  }
                }}
                className="inline-block px-8 sm:px-10 py-4 sm:py-4.5 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors touch-manipulation text-base sm:text-lg"
              >
                Get a Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 sm:mb-7 md:mb-8 text-center">
            Meet The Team
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2">
            The team behind ZeroRender, combining technical excellence, creative vision, and sales expertise to deliver
            exceptional digital experiences.
          </p>

          <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
            <a
              href="#join-team"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors touch-manipulation text-base sm:text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Join Our Team
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-16 max-w-7xl mx-auto">
            {/* Tyler Plymale */}
            <div className="group">
              <div className="relative overflow-hidden mb-5 sm:mb-6 md:mb-8 aspect-[3/4]">
                <img
                  src="/tyler-plymale.jpg"
                  alt="Tyler Plymale"
                  className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href="tel:+16142547367"
                    onClick={() =>
                      typeof window !== "undefined" &&
                      (window as any).gtag_report_phone_conversion &&
                      (window as any).gtag_report_phone_conversion("tel:+16142547367")
                    }
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Call Tyler"
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
                  </a>
                  <a
                    href="mailto:tplymale@zero-render.com"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Email Tyler"
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
                  </a>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">Tyler Plymale</h3>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 mb-3 sm:mb-4">Founder & Web Developer</p>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                Expert in building scalable web applications with a passion for clean code, performance optimization,
                and innovative solutions.
              </p>
            </div>

            {/* Jessica-Lee Tingley */}
            <div className="group">
              <div className="relative overflow-hidden mb-5 sm:mb-6 md:mb-8 aspect-[3/4]">
                <img
                  src="/jessica-lee-tingley.jpg"
                  alt="Jessica-Lee Tingley"
                  className="w-full h-full object-cover object-top md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href="tel:+16142547367"
                    onClick={() =>
                      typeof window !== "undefined" &&
                      (window as any).gtag_report_phone_conversion &&
                      (window as any).gtag_report_phone_conversion("tel:+16142547367")
                    }
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Call Jessica"
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
                  </a>
                  <a
                    href="mailto:jtingley@zero-render.com"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Email Jessica"
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
                  </a>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">Jessica-Lee Tingley</h3>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 mb-3 sm:mb-4">Sales & Client Acquisition</p>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                Specializes in creating elegant, user-centric digital experiences with a focus on modern web
                technologies and AI integration.
              </p>
            </div>

            {/* Kara Khechimmadi */}
            <div className="group">
              <div className="relative overflow-hidden mb-5 sm:mb-6 md:mb-8 aspect-[3/4]">
                <img
                  src="/images/img-3352.jpeg"
                  alt="Kara Khechimmadi"
                  className="w-full h-full object-cover object-top md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href="tel:+16143973562"
                    onClick={() =>
                      typeof window !== "undefined" &&
                      (window as any).gtag_report_phone_conversion &&
                      (window as any).gtag_report_phone_conversion("tel:+16143973562")
                    }
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Call Kara"
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
                  </a>
                  <a
                    href="mailto:kara@zero-render.com"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Email Kara"
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
                  </a>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">Kara Khechimmadi</h3>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 mb-3 sm:mb-4">Sales & Client Acquisition</p>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                Drives business growth and client relationships, connecting entrepreneurs with the perfect digital
                solutions to launch and scale their vision.
              </p>
            </div>

            {/* Ali Abdulaati */}
            <div className="group">
              <div className="relative overflow-hidden mb-5 sm:mb-6 md:mb-8 aspect-[3/4]">
                <img
                  src="/images/img-3207-2.jpg"
                  alt="Ali Abdulaati"
                  className="w-full h-full object-cover object-top scale-105 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href="mailto:ali@zero-render.com"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="Email Ali"
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">Ali Abdulaati</h3>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 mb-3 sm:mb-4">Sales & Client Acquisition</p>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                Brings energy and expertise to client engagement, helping businesses find the right technology solutions
                to achieve their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-950 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
              Stay in the Loop
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Get the latest updates on AI-powered tools, design trends, and tips to grow your business. No spam, just
              valuable insights.
            </p>
          </div>

          <NewsletterForm />
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
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/blog"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 py-6 sm:py-7 md:py-8 text-zinc-500 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} ZeroRender, Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactForm open={isContactOpen} onOpenChange={setIsContactOpen} />

      {/* Job Application Section */}
      <JobApplicationSection />
    </main>
  )
}
