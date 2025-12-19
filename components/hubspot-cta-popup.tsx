"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function HubSpotCTAPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after a short delay (1 second) for better UX on every visit
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // No longer storing in localStorage - popup will show on every visit
  }

  // Add mobile-optimized CSS for HubSpot form
  useEffect(() => {
    if (!isOpen) return

    const styleId = "hubspot-form-mobile-styles"
    if (document.getElementById(styleId)) return

    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      #hubspot-form-container {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      #hubspot-form-container * {
        box-sizing: border-box !important;
      }
      #hubspot-form-container form {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      #hubspot-form-container .hs-form-field {
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 1.25rem !important;
        display: block !important;
      }
      #hubspot-form-container .hs-form-field > label {
        width: 100% !important;
        max-width: 100% !important;
        display: block !important;
        margin-bottom: 0.5rem !important;
      }
      #hubspot-form-container .hs-input,
      #hubspot-form-container input[type="text"],
      #hubspot-form-container input[type="email"],
      #hubspot-form-container input[type="tel"],
      #hubspot-form-container input[type="number"],
      #hubspot-form-container textarea,
      #hubspot-form-container select {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        font-size: 16px !important;
        padding: 0.875rem !important;
        border-radius: 0.375rem !important;
        margin: 0 !important;
        display: block !important;
      }
      #hubspot-form-container .hs-submit {
        width: 100% !important;
        max-width: 100% !important;
        margin-top: 1rem !important;
      }
      #hubspot-form-container .hs-submit .hs-button {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0.875rem 1.5rem !important;
        font-size: 1rem !important;
        box-sizing: border-box !important;
      }
      #hubspot-form-container iframe {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 640px) {
        #hubspot-form-container {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        #hubspot-form-container form {
          padding: 0 !important;
        }
        #hubspot-form-container .hs-form-field {
          margin-bottom: 1.5rem !important;
          padding: 0 !important;
        }
        #hubspot-form-container .hs-input,
        #hubspot-form-container input[type="text"],
        #hubspot-form-container input[type="email"],
        #hubspot-form-container input[type="tel"],
        #hubspot-form-container input[type="number"],
        #hubspot-form-container textarea,
        #hubspot-form-container select {
          font-size: 16px !important;
          padding: 1rem !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        #hubspot-form-container .hs-submit {
          width: 100% !important;
          margin: 1.5rem 0 0 0 !important;
        }
        #hubspot-form-container .hs-submit .hs-button {
          width: 100% !important;
          padding: 1rem 1.5rem !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [isOpen])

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
            css: "",
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
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-4"
      onClick={handleClose}
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[700px] my-auto relative flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxHeight: "calc(100vh - 2rem)",
          minHeight: "min-content",
          margin: "1rem auto"
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-all duration-200 shadow-sm touch-manipulation"
          aria-label="Close popup"
          style={{ touchAction: "manipulation" }}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Header Section */}
        <div className="px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-5 sm:pb-6 md:pb-8 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white flex-shrink-0">
          <div className="pr-8 sm:pr-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 sm:mb-6 leading-tight tracking-tight">
              Win a Complimentary 6-Page Website
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p className="text-gray-800">
                We are offering one business the opportunity to receive a complimentary, fully custom six-page website—designed, developed, and launched by ZeroRender, Inc.
              </p>
              <p className="text-gray-700">
                This is not a template or demo build. The selected business will receive a modern, mobile-responsive website structured for clarity, performance, and real-world usability. The initiative reflects our studio's standards and approach to digital work, while providing a meaningful upgrade to a business positioned for growth.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900 text-lg">
                  Entry is free. One business will be selected through a randomized drawing and contacted directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HubSpot Form Container */}
        <div
          id="hubspot-form-container"
          className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-8 flex-1"
          style={{
            minHeight: "300px",
            maxHeight: "calc(100vh - 350px)",
            WebkitOverflowScrolling: "touch",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
            boxSizing: "border-box",
            position: "relative"
          }}
        >
          {/* Loading indicator */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black mb-4"></div>
              <p className="text-sm text-gray-600 font-medium">Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

