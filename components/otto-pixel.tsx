"use client"

import { useEffect } from "react"

export function OttoPixel() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.location.hostname.includes("vusercontent.net") &&
      !window.location.hostname.includes("localhost")
    ) {
      try {
        const script = document.createElement("script")
        script.setAttribute("nowprocket", "")
        script.setAttribute("nitro-exclude", "")
        script.setAttribute("type", "text/javascript")
        script.setAttribute("id", "sa-dynamic-optimization")
        script.setAttribute("data-uuid", "0e1eebfd-dfc9-4909-b309-90a211eaf0a4")
        script.src =
          "data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjBlMWVlYmZkLWRmYzktNDkwOS1iMzA5LTkwYTIxMWVhZjBhNCI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="

        // Add error handling to prevent failed requests from causing issues
        script.onerror = () => {
          // Silently fail - SearchAtlas script is optional
          console.debug("SearchAtlas script failed to load (non-critical)")
        }

        // Add timeout to prevent hanging requests
        script.onload = () => {
          // Override fetch/XMLHttpRequest to handle failed API calls gracefully
          if (typeof window !== "undefined" && window.XMLHttpRequest) {
            const originalOpen = XMLHttpRequest.prototype.open
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
              // If it's a SearchAtlas API call, add error handling
              if (typeof url === "string" && url.includes("searchatlas.com")) {
                this.addEventListener("error", () => {
                  // Silently handle SearchAtlas API errors
                  console.debug("SearchAtlas API request failed (non-critical)")
                })
                this.addEventListener("load", function() {
                  if (this.status >= 400) {
                    // Silently handle failed responses
                    console.debug("SearchAtlas API returned error (non-critical)")
                  }
                })
              }
              return originalOpen.apply(this, [method, url, ...args])
            }
          }
        }

        document.head.appendChild(script)
      } catch (error) {
        // Silently fail if script creation fails
        console.debug("Failed to initialize SearchAtlas script (non-critical):", error)
      }
    }
  }, [])

  return null
}
