"use client"

import { useEffect } from "react"

export function OttoPixel() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.location.hostname.includes("vusercontent.net") &&
      !window.location.hostname.includes("localhost")
    ) {
      const script = document.createElement("script")
      script.setAttribute("nowprocket", "")
      script.setAttribute("nitro-exclude", "")
      script.setAttribute("type", "text/javascript")
      script.setAttribute("id", "sa-dynamic-optimization")
      script.setAttribute("data-uuid", "4d62ee65-d9cc-4eed-a029-99566996b4ef")
      script.src =
        "data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjRkNjJlZTY1LWQ5Y2MtNGVlZC1hMDI5LTk5NTY2OTk2YjRlZiI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="

      document.head.appendChild(script)
    }
  }, [])

  return null
}
