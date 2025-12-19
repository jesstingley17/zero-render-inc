"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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

      {/* Privacy Policy Content */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
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
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mb-12 sm:mb-14 md:mb-16">
            Last updated: December 18, 2024
          </p>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 sm:space-y-10 md:space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Introduction
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                ZeroRender, Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website
                zero-render.com (the "Site") and use our services.
              </p>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Please read this Privacy Policy carefully. By accessing or using our Site, you agree to be bound by the
                terms described in this policy. If you do not agree with the practices described in this policy, please
                do not use our Site.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Information We Collect
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-6">Information You Provide to Us</h3>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                We may collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>Contact us through our contact form or email</li>
                <li>Subscribe to our newsletter</li>
                <li>Apply for a job position</li>
                <li>Request a quote or service</li>
                <li>Communicate with us via phone, email, or other means</li>
              </ul>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mt-4">
                This information may include your name, email address, phone number, company name, and any other
                information you choose to provide.
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-8">Automatically Collected Information</h3>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                When you visit our Site, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages you visit on our Site</li>
                <li>Time and date of your visit</li>
                <li>Time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                How We Use Your Information
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries, comments, and requests</li>
                <li>Send you newsletters, marketing communications, and updates (with your consent)</li>
                <li>Process job applications</li>
                <li>Analyze usage patterns and trends to improve user experience</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and prevent fraud</li>
              </ul>
            </div>

            {/* Information Sharing and Disclosure */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Information Sharing and Disclosure
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>
                  <strong>Service Providers:</strong> We may share information with third-party service providers who
                  perform services on our behalf, such as email delivery, analytics, and hosting services.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information if required by law or in response to
                  valid requests by public authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information with your explicit consent or at
                  your direction.
                </li>
              </ul>
            </div>

            {/* Cookies and Tracking Technologies */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Site and store certain
                information. Cookies are files with a small amount of data that may include an anonymous unique
                identifier.
              </p>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                We use cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>Analyzing site traffic and usage patterns</li>
                <li>Improving user experience</li>
                <li>Remembering your preferences</li>
                <li>Providing personalized content</li>
              </ul>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                However, if you do not accept cookies, you may not be able to use some portions of our Site.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Third-Party Services
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                Our Site may contain links to third-party websites or services that are not owned or controlled by
                ZeroRender, Inc. We are not responsible for the privacy practices of these third-party sites. We
                encourage you to review the privacy policies of any third-party sites you visit.
              </p>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                We may use third-party services such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4 mt-4">
                <li>Google Analytics for website analytics</li>
                <li>Email service providers for newsletter delivery</li>
                <li>Payment processors for transaction processing</li>
                <li>Cloud hosting services for data storage</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Data Security
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Your Rights
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed ml-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Children's Privacy
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Our Site is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us immediately.
              </p>
            </div>

            {/* Changes to This Privacy Policy */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Changes to This Privacy Policy
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6">
                Contact Us
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="border border-white/10 p-6 sm:p-8 bg-white/5 mt-6">
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-2">
                  <strong>ZeroRender, Inc.</strong>
                </p>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-2">
                  Email: <a href="mailto:privacy@zero-render.com" className="text-white hover:text-zinc-300 underline">privacy@zero-render.com</a>
                </p>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-2">
                  Phone: <a href="tel:+13802662079" className="text-white hover:text-zinc-300 underline">+1 (380) 266-2079</a>
                </p>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  Website: <a href="https://zero-render.com" className="text-white hover:text-zinc-300 underline">zero-render.com</a>
                </p>
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

