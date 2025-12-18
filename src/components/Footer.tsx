"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "sonner"

export const Footer = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

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

      toast.success("Subscribed successfully!")
      setEmail("")
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-black text-white pt-24 border-t border-white/10">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Let's Build the
              <br />
              Future Together.
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mb-8">
              Ready to launch or scale your business? Connect with our team to see how ZeroRender can power your digital
              presence with AI-driven tools and sleek design.
            </p>
            <div className="flex gap-4">
              <form onSubmit={handleSubscribe} className="flex gap-4 w-full">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent border-white/20 text-white placeholder:text-zinc-500 rounded-none h-12 w-full max-w-xs focus:ring-0 focus:border-white transition-colors duration-300"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 bg-white text-black hover:bg-zinc-900 hover:text-white hover:border-white border border-transparent rounded-none px-6 transition-all duration-300"
                >
                  {loading ? (
                    "..."
                  ) : (
                    <>
                      <span className="mr-2">Subscribe</span> <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="md:pl-10">
            <div>
              <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">Sitemap</h4>
              <ul className="space-y-4 text-zinc-300">
                <li>
                  <a
                    href="#expertise"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Expertise
                  </a>
                </li>
                <li>
                  <a
                    href="#approach"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#packages"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Packages
                  </a>
                </li>
                <li>
                  <a
                    href="#vision"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Vision
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 py-12 mb-8">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">General Inquiries</h4>
            <a
              href="mailto:info@zero-render.com"
              className="text-xl text-white hover:text-zinc-400 transition-colors duration-300"
            >
              info@zero-render.com
            </a>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Support</h4>
            <a
              href="mailto:help@zero-render.com"
              className="text-xl text-white hover:text-zinc-400 transition-colors duration-300"
            >
              help@zero-render.com
            </a>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Call Us</h4>
            <a
              href="tel:+13802662079"
              className="text-xl text-white hover:text-zinc-400 transition-colors duration-300"
            >
              +1 (380) 266-2079
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} ZeroRender, Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
