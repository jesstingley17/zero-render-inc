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

  // Load HubSpot Forms script and initialize
  useEffect(() => {
    if (!isOpen) return

    let script: HTMLScriptElement | null = null
    let retryCount = 0
    const maxRetries = 20

    const initializeForm = () => {
      const formContainer = document.getElementById("hubspot-form-container")
      
      if (!formContainer) {
        console.error("[HubSpot Form] Container not found")
        return false
      }

      // Check if form already exists
      if (formContainer.querySelector("form") || formContainer.querySelector("iframe")) {
        console.log("[HubSpot Form] Already initialized")
        return true
      }

      // Try to create form
      if (typeof window !== "undefined" && (window as any).hbspt && (window as any).hbspt.forms) {
        try {
          console.log("[HubSpot Form] Creating form...")
          ;(window as any).hbspt.forms.create({
            portalId: "244653866",
            formId: "9640698c-a4b5-4b11-8dcb-8a88049637e9",
            region: "na2",
            target: "#hubspot-form-container",
          })
          console.log("[HubSpot Form] Form creation called")
          return true
        } catch (error) {
          console.error("[HubSpot Form] Error creating form:", error)
          return false
        }
      } else {
        console.log("[HubSpot Form] hbspt.forms not available yet")
      }
      
      return false
    }

    const tryInitialize = () => {
      if (initializeForm()) {
        return // Success
      }

      retryCount++
      if (retryCount < maxRetries) {
        setTimeout(tryInitialize, 300)
      } else {
        console.error("Failed to initialize HubSpot form after multiple attempts")
      }
    }

    // Check if script already exists
    const existingScript = document.getElementById("hs-forms-script-loader") as HTMLScriptElement
    
    if (existingScript) {
      // Script exists, wait for it to be ready
      if ((window as any).hbspt && (window as any).hbspt.forms) {
        setTimeout(tryInitialize, 200)
      } else {
        existingScript.onload = () => setTimeout(tryInitialize, 200)
        if (existingScript.complete || existingScript.readyState === "complete") {
          setTimeout(tryInitialize, 200)
        }
      }
    } else {
      // Load the HubSpot Forms script
      script = document.createElement("script")
      script.src = "https://js-na2.hsforms.net/forms/embed/v2.js"
      script.async = true
      script.charset = "utf-8"
      script.id = "hs-forms-script-loader"
      script.type = "text/javascript"
      
      script.onload = () => {
        // Wait a bit for script to initialize, then try to create form
        setTimeout(tryInitialize, 500)
      }
      
      script.onerror = () => {
        console.error("Failed to load HubSpot Forms script")
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
        className="bg-white rounded-lg w-full max-w-[700px] max-h-[90vh] overflow-auto relative flex flex-col"
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

        {/* Header Section */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Win a Complimentary 6-Page Website
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              We are offering one business the opportunity to receive a complimentary, fully custom six-page website—designed, developed, and launched by ZeroRender, Inc.
            </p>
            <p>
              This is not a template or demo build. The selected business will receive a modern, mobile-responsive website structured for clarity, performance, and real-world usability. The initiative reflects our studio's standards and approach to digital work, while providing a meaningful upgrade to a business positioned for growth.
            </p>
            <p className="font-semibold text-gray-900">
              Entry is free. One business will be selected through a randomized drawing and contacted directly.
            </p>
          </div>
        </div>

        {/* HubSpot Form Container */}
        <div
          id="hubspot-form-container"
          className="w-full p-6 sm:p-8 flex-1"
          style={{
            minHeight: "400px",
          }}
        >
          {/* Loading indicator */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4"></div>
              <p className="text-sm text-gray-600">Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

