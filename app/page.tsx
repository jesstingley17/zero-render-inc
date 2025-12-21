"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Menu, X, ArrowDown, Mail } from "lucide-react"

// Lazy load heavy components to improve initial page load
const ContactForm = dynamic(() => import("@/components/contact-form"), {
  ssr: false, // Only load on client side
})

const JobApplicationSection = dynamic(() => import("@/components/job-application-section"), {
  ssr: false, // Only load on client side
})

const HubSpotCTAPopup = dynamic(() => import("@/components/hubspot-cta-popup"), {
  ssr: false, // Only load on client side
})

function NewsletterForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <style jsx>{`
        #af-form-597809634 {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background-color: transparent !important;
          border-radius: 0 !important;
        }
        
        #af-form-597809634 .af-header {
          background-color: transparent !important;
          background-image: none !important;
          border: none !important;
          padding: 0 0 1.5rem 0 !important;
        }
        
        #af-form-597809634 .af-body {
          background-color: transparent !important;
          padding: 0 !important;
        }
        
        #af-form-597809634 .af-element {
          padding: 0 0 1.5rem 0 !important;
          margin: 0 !important;
        }
        
        #af-form-597809634 label.previewLabel {
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          margin-bottom: 0.5rem !important;
          width: 100% !important;
          text-align: left !important;
          float: none !important;
        }
        
        #af-form-597809634 .af-textWrap {
          width: 100% !important;
          float: none !important;
        }
        
        #af-form-597809634 input.text,
        #af-form-597809634 input[type="text"],
        #af-form-597809634 input[type="email"] {
          width: 100% !important;
          padding: 0.875rem 1rem !important;
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: 1rem !important;
          border-radius: 0 !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
        }
        
        #af-form-597809634 input.text:focus,
        #af-form-597809634 input[type="text"]:focus,
        #af-form-597809634 input[type="email"]:focus {
          outline: none !important;
          border-color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
        }
        
        #af-form-597809634 input.text::placeholder,
        #af-form-597809634 input[type="text"]::placeholder,
        #af-form-597809634 input[type="email"]::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        #af-form-597809634 .buttonContainer {
          text-align: left !important;
          margin-top: 0.5rem !important;
        }
        
        #af-form-597809634 input.submit {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ffffff !important;
          padding: 0.875rem 2rem !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          border-radius: 0 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          width: auto !important;
        }
        
        #af-form-597809634 input.submit:hover {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #ffffff !important;
        }
        
        #af-form-597809634 .af-footer {
          background-color: transparent !important;
          padding: 1rem 0 0 0 !important;
          border: none !important;
        }
        
        #af-form-597809634 .af-footer p {
          color: rgba(255, 255, 255, 0.5) !important;
          font-size: 0.75rem !important;
          text-align: center !important;
        }
        
        #af-form-597809634 .poweredBy,
        #af-form-597809634 .privacyPolicy {
          display: none !important;
        }
      `}</style>
      
      <form method="post" className="af-form-wrapper" acceptCharset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl">
        <div style={{ display: "none" }}>
          <input type="hidden" name="meta_web_form_id" value="597809634" />
          <input type="hidden" name="meta_split_id" value="" />
          <input type="hidden" name="listname" value="awlist6931035" />
          <input type="hidden" name="redirect" value="https://www.aweber.com/thankyou-coi.htm?m=text" id="redirect_6d64ba6dfa8b704cec059071a0ad3f18" />
          <input type="hidden" name="meta_adtracking" value="Newsletter_Signup" />
          <input type="hidden" name="meta_message" value="1" />
          <input type="hidden" name="meta_required" value="name (awf_first),name (awf_last),email" />
          <input type="hidden" name="meta_tooltip" value="" />
        </div>
        
        <div id="af-form-597809634" className="af-form">
          <div id="af-body-597809634" className="af-body af-standards">
            <div className="af-element">
              <label className="previewLabel" htmlFor="awf_field-118469295-first">First Name:</label>
              <div className="af-textWrap">
                <input
                  id="awf_field-118469295-first"
                  type="text"
                  className="text"
                  name="name (awf_first)"
                  defaultValue=""
                  tabIndex={500}
                />
              </div>
              <div className="af-clear"></div>
            </div>
            
            <div className="af-element">
              <label className="previewLabel" htmlFor="awf_field-118469295-last">Last Name:</label>
              <div className="af-textWrap">
                <input
                  id="awf_field-118469295-last"
                  className="text"
                  type="text"
                  name="name (awf_last)"
                  defaultValue=""
                  tabIndex={501}
                />
              </div>
              <div className="af-clear"></div>
            </div>
            
            <div className="af-element">
              <label className="previewLabel" htmlFor="awf_field-118469296">Email:</label>
              <div className="af-textWrap">
                <input
                  className="text"
                  id="awf_field-118469296"
                  type="email"
                  name="email"
                  defaultValue=""
                  tabIndex={502}
                />
              </div>
              <div className="af-clear"></div>
            </div>
            
            <div className="af-element buttonContainer">
              <input name="submit" className="submit" type="submit" value="Subscribe" tabIndex={503} />
              <div className="af-clear"></div>
            </div>
          </div>
        </div>
        
        <div style={{ display: "none" }}>
          <img src="https://forms.aweber.com/form/displays.htm?id=rJzsHAycbMws" alt="" />
        </div>
      </form>
      
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
            <img src="/logo_bw_inverted.png" alt="ZeroRender" className="h-7 sm:h-10 md:h-12 w-auto" loading="eager" fetchPriority="high" />
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
              href="/services"
              className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="/about"
              className="text-xs lg:text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              About
            </a>
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
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
              >
                Services
              </a>
              <a
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-white py-3 transition-colors touch-manipulation"
              >
                About
              </a>
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
            Premier Web Design Studio
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-7 md:mb-8 leading-[1.1] px-1">
            Design. Intelligence.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Perfection.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-1">
            ZeroRender is a premier web design studio and digital design agency creating bespoke websites and brands. As a leading branding studio, we build digital products for startups.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-11 md:mb-12 px-1">
            Our web design studio creates custom websites that combine stunning visual design with intelligent technology, helping small businesses and startups establish a powerful online presence. As a full-service digital design agency, we deliver enterprise-level website design and development services without the complexity or high costs typically associated with large agencies.
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12">
          <ArrowDown className="text-white/30 animate-bounce" size={24} />
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 sm:mb-8 md:mb-10 text-center">
            Our Web Design Studio Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto text-center leading-relaxed mb-8 sm:mb-10">
            As a full-service digital design agency, we offer a comprehensive suite of solutions tailored to elevate your brand and accelerate your growth. Our expertise is focused on delivering tangible results and a significant return on investment.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-3xl mx-auto text-center leading-relaxed mb-12 sm:mb-14 md:mb-16">
            Whether you need a complete website redesign, a new brand identity, or advanced AI integration, our digital design agency provides end-to-end services that transform your online presence. We understand that effective website design goes beyond aesthetics—it requires strategic thinking, technical expertise, and a deep understanding of your business goals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {[
              { title: "Website Design & Development", desc: "We craft beautiful, responsive websites that not only capture attention but are engineered to convert visitors into customers." },
              { title: "Brand Identity", desc: "Our team develops cohesive visual systems and strategic messaging that define your business and resonate with your target audience." },
              { title: "AI Integration", desc: "We implement intelligent automation and advanced tools into your workflows, enhancing efficiency and creating smarter digital experiences." },
              { title: "SEO Optimization", desc: "We ensure your business gets found by ideal customers through meticulous search engine optimization strategies." },
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

      {/* Approach */}
      <section id="approach" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 sm:mb-8 md:mb-10 text-center">
            Our Strategic Approach
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto text-center leading-relaxed mb-8 sm:mb-10">
            Our methodology is built on a foundation of strategy, execution, and partnership, ensuring every project we undertake is positioned for success from the outset.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-3xl mx-auto text-center leading-relaxed mb-12 sm:mb-14 md:mb-16">
            Every successful website design project begins with understanding your unique business needs. Our web design studio takes a collaborative approach, working closely with you to develop custom solutions that reflect your brand values and drive measurable business outcomes. From initial concept to final launch, we ensure your website design meets the highest standards of quality, performance, and user experience.
          </p>
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="border border-white/10 p-6 sm:p-8 hover:bg-white/5 transition-colors">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Discovery and Strategy</h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                We begin every engagement by thoroughly understanding your business objectives, target market, and specific challenges. This allows our web design studio to formulate a bespoke strategy that drives measurable results and aligns perfectly with your vision.
              </p>
            </div>
            <div className="border border-white/10 p-6 sm:p-8 hover:bg-white/5 transition-colors">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Design and Development</h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Our team combines modern design principles with cutting-edge technology. As a forward-thinking branding studio, we create beautiful and functional solutions, leveraging AI-powered tools to deliver exceptional digital products that set you apart from the competition.
              </p>
            </div>
            <div className="border border-white/10 p-6 sm:p-8 hover:bg-white/5 transition-colors">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Launch and Growth</h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                We provide robust, ongoing support to help your business grow and adapt in a dynamic market. We are committed to a long-term partnership, ensuring your digital presence evolves with your business and continues to perform at its peak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
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

      {/* Newsletter Section - Prominent Placement */}
      <section id="newsletter" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 border-t border-white/10 relative overflow-hidden">
        {/* Background gradient for prominence */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-5 sm:mb-6 md:mb-8">
              Stay in the Loop
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-2">
              Get the latest updates on AI-powered tools, design trends, and tips to grow your business.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-2xl mx-auto">
              No spam, just valuable insights delivered to your inbox.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 sm:p-10 md:p-12 backdrop-blur-sm">
            <NewsletterForm />
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
                    href="tel:+16144298829"
                    onClick={() =>
                      typeof window !== "undefined" &&
                      (window as any).gtag_report_phone_conversion &&
                      (window as any).gtag_report_phone_conversion("tel:+16144298829")
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
                    href="https://wa.me/16144298829"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                    aria-label="WhatsApp Jessica"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

      {/* Vision */}
      <section id="vision" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 sm:mb-8 md:mb-10">
            Why Choose Our Branding Studio?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            ZeroRender is more than just a digital design agency; we are your strategic partner in innovation. We understand that every business is unique. For this reason, we build custom packages that perfectly fit your specific needs and budget, ensuring you receive a tailored solution without compromise. Our team, a collective of technical experts and creative visionaries, is dedicated to delivering excellence.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what businesses like yours are saying about working with ZeroRender.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="border border-white/10 p-6 sm:p-8 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="mb-4 sm:mb-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed italic">
                  "ZeroRender transformed our online presence completely. The website they built is fast, beautiful, and
                  has already generated more leads than we expected. The AI chatbot integration was a game-changer for
                  our customer service."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm sm:text-base font-semibold text-white">Sarah Chen</p>
                <p className="text-xs sm:text-sm text-zinc-500">Founder</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border border-white/10 p-6 sm:p-8 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="mb-4 sm:mb-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed italic">
                  "The branding package exceeded our expectations. Not only did we get a stunning logo and brand kit,
                  but the team also helped us understand how to use our new identity consistently across all platforms.
                  Professional, fast, and affordable."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm sm:text-base font-semibold text-white">Marcus Rodriguez</p>
                <p className="text-xs sm:text-sm text-zinc-500">Business Owner</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border border-white/10 p-6 sm:p-8 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="mb-4 sm:mb-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed italic">
                  "As a small business owner, I was worried about the cost and complexity of going digital. ZeroRender
                  made it easy and affordable. Their AI integration package helped us automate so much, and the support
                  has been incredible. Highly recommend!"
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm sm:text-base font-semibold text-white">Jennifer Park</p>
                <p className="text-xs sm:text-sm text-zinc-500">CEO</p>
              </div>
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
              <h4 className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 mb-6 sm:mb-8">Sitemap</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-5">
                {["Expertise", "Approach", "Packages", "Team", "Vision"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm sm:text-base text-zinc-400 hover:text-white transition-colors touch-manipulation inline-block py-1"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="/services"
                  className="text-sm sm:text-base text-zinc-400 hover:text-white transition-colors touch-manipulation inline-block py-1"
                >
                  Services
                </a>
                <a
                  href="/about"
                  className="text-sm sm:text-base text-zinc-400 hover:text-white transition-colors touch-manipulation inline-block py-1"
                >
                  About
                </a>
                <a
                  href="/blog"
                  className="text-sm sm:text-base text-zinc-400 hover:text-white transition-colors touch-manipulation inline-block py-1"
                >
                  Blog
                </a>
                <a
                  href="/privacy-policy"
                  className="text-sm sm:text-base text-zinc-400 hover:text-white transition-colors touch-manipulation inline-block py-1"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-6 sm:py-7 md:py-8 space-y-4">
            <p className="text-zinc-500 text-xs sm:text-sm text-center leading-relaxed max-w-3xl mx-auto px-4">
              We improve our products and advertising by using Microsoft Clarity to see how you use our website. By using our site, you agree that we and Microsoft can collect and use this data. Our{" "}
              <a href="/privacy-policy" className="text-white/70 hover:text-white underline">
                privacy statement
              </a>{" "}
              has more details.
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} ZeroRender, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactForm open={isContactOpen} onOpenChange={setIsContactOpen} />

      {/* Job Application Section */}
      <JobApplicationSection />

      {/* HubSpot CTA Popup */}
      <HubSpotCTAPopup />
    </main>
  )
}
