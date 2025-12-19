"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function HubSpotCTAPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("hubspot-cta-seen")
    
    if (!hasSeenPopup) {
      // Show popup after a short delay (1 second) for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Mark as seen in localStorage (expires after 30 days)
    localStorage.setItem("hubspot-cta-seen", "true")
    // Set expiration date (30 days from now)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    localStorage.setItem("hubspot-cta-expires", expirationDate.toISOString())
  }

  // Check if popup has expired (show again after 30 days)
  useEffect(() => {
    const expirationDate = localStorage.getItem("hubspot-cta-expires")
    if (expirationDate) {
      const now = new Date()
      const expires = new Date(expirationDate)
      if (now > expires) {
        localStorage.removeItem("hubspot-cta-seen")
        localStorage.removeItem("hubspot-cta-expires")
      }
    }
  }, [])

  // Load HubSpot CTA script and initialize
  useEffect(() => {
    if (!isOpen) return

    let script: HTMLScriptElement | null = null
    let retryCount = 0
    const maxRetries = 20

    const initializeCTA = () => {
      const ctaElement = document.getElementById("hs-cta-embed-279511877357")
      
      if (!ctaElement) {
        console.error("[HubSpot CTA] Element not found")
        return false
      }

      // Check if already initialized (has iframe)
      if (ctaElement.querySelector("iframe")) {
        console.log("[HubSpot CTA] Already initialized")
        return true
      }

      // Try to initialize
      if (typeof window !== "undefined" && (window as any).hscta) {
        try {
          console.log("[HubSpot CTA] Initializing...")
          ;(window as any).hscta.load(279511877357, {
            targetId: "hs-cta-embed-279511877357",
          })
          console.log("[HubSpot CTA] Initialization called")
          return true
        } catch (error) {
          console.error("[HubSpot CTA] Error initializing:", error)
          return false
        }
      } else {
        console.log("[HubSpot CTA] hscta not available yet")
      }
      
      return false
    }

    const tryInitialize = () => {
      if (initializeCTA()) {
        return // Success
      }

      retryCount++
      if (retryCount < maxRetries) {
        setTimeout(tryInitialize, 300)
      } else {
        console.error("Failed to initialize HubSpot CTA after multiple attempts")
      }
    }

    // Check if script already exists
    const existingScript = document.getElementById("hs-script-loader") as HTMLScriptElement
    
    if (existingScript) {
      // Script exists, wait for it to be ready
      if ((window as any).hscta) {
        setTimeout(tryInitialize, 200)
      } else {
        existingScript.onload = () => setTimeout(tryInitialize, 200)
        if (existingScript.complete || existingScript.readyState === "complete") {
          setTimeout(tryInitialize, 200)
        }
      }
    } else {
      // Load the script
      script = document.createElement("script")
      script.src = "https://js-na2.hscta.com/cta/current.js"
      script.async = true
      script.charset = "utf-8"
      script.id = "hs-script-loader"
      
      script.onload = () => {
        // Wait a bit for script to initialize, then try to load CTA
        setTimeout(tryInitialize, 500)
      }
      
      script.onerror = () => {
        console.error("Failed to load HubSpot CTA script")
      }
      
      document.head.appendChild(script)
    }

    return () => {
      // Don't remove script as it might be used elsewhere
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[700px] max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh" }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* HubSpot CTA Embed - Using exact structure from HubSpot */}
        <div
          id="hs-cta-embed-279511877357"
          className="hs-cta-embed hs-cta-embed-279511877357"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            minWidth: "320px",
            height: "620px",
          }}
          data-hubspot-wrapper-cta-id="279511877357"
        >
          <div className="hs-cta-loading-dot__container">
            <div className="hs-cta-loading-dot"></div>
            <div className="hs-cta-loading-dot"></div>
            <div className="hs-cta-loading-dot"></div>
          </div>
          <div className="hs-cta-embed__skeleton"></div>
          <picture>
            <source
              srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              media="(max-width: 480px)"
            />
            <img
              alt="Exclusive Website Transformation Opportunity Apply for a complimentary 6-page website rebuild&mdash;designed for one exceptional small business or startup"
              loading="lazy"
              src="https://hubspot-no-cache-na2-prod.s3.amazonaws.com/cta/default/244653866/interactive-279511877357.png"
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
          </picture>
        </div>
      </div>
    </div>
  )
}

