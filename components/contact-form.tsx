"use client"

import { useState, type FormEvent } from "react"

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packageTitle?: string | null
}

export default function ContactForm({ open, onOpenChange, packageTitle }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    serviceInterest: [] as string[],
    websitePurpose: "",
    businessDescription: "",
    existingWebsite: "no",
    existingWebsiteUrl: "",
    designStyle: [] as string[],
    timeline: "",
    budget: "",
    source: "",
    additionalInfo: "",
  })

  if (!open) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formattedMessage = `
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Business Name: ${formData.businessName || "N/A"}
Services Interested In: ${formData.serviceInterest.join(", ") || "None selected"}

Main Purpose of Website/Project:
${formData.websitePurpose}

Business Description:
${formData.businessDescription}

Existing Website: ${formData.existingWebsite === "yes" ? formData.existingWebsiteUrl : "No"}

Preferred Design Style: ${formData.designStyle.join(", ") || "Not specified"}

Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
Source: ${formData.source}

Additional Info:
${formData.additionalInfo || "N/A"}
    `.trim()

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          message: formattedMessage,
          type: "inquiry",
          packageTitle: packageTitle || "General Inquiry",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send inquiry")
      }

      if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
        ;(window as any).gtag_report_conversion()
      }

      alert("Inquiry sent successfully! We'll be in touch soon.")
      onOpenChange(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        serviceInterest: [],
        websitePurpose: "",
        businessDescription: "",
        existingWebsite: "no",
        existingWebsiteUrl: "",
        designStyle: [],
        timeline: "",
        budget: "",
        source: "",
        additionalInfo: "",
      })
    } catch (error) {
      console.error("[v0] Contact form error:", error)
      alert(`Failed to send inquiry: ${error instanceof Error ? error.message : "Please try again."}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckbox = (field: "serviceInterest" | "designStyle", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">Inquire about {packageTitle || "Services"}</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Tell us about your project so we can create something amazing together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Business Name *</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-3">Services Interested In *</label>
            <div className="space-y-2">
              {[
                "Starter Website",
                "Branding + Website",
                "Full Startup Package",
                "AI Integration",
                "Logo Design",
                "Graphics Pack",
                "Monthly Maintenance",
                "Not sure yet",
              ].map((service) => (
                <label key={service} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.serviceInterest.includes(service)}
                    onChange={() => handleCheckbox("serviceInterest", service)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 text-white focus:ring-2 focus:ring-white"
                  />
                  <span className="text-zinc-300">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Main Purpose of Website/Project *</label>
            <input
              type="text"
              required
              value={formData.websitePurpose}
              onChange={(e) => setFormData({ ...formData, websitePurpose: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Ex: booking clients, selling products, portfolio..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Business Description *</label>
            <textarea
              required
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white min-h-[100px]"
              placeholder="Tell us what makes your business unique..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-3">Do you have an existing website? *</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="existingWebsite"
                  value="yes"
                  checked={formData.existingWebsite === "yes"}
                  onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                  className="w-4 h-4 border-zinc-600 bg-zinc-900 text-white"
                />
                <span className="text-zinc-300">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="existingWebsite"
                  value="no"
                  checked={formData.existingWebsite === "no"}
                  onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                  className="w-4 h-4 border-zinc-600 bg-zinc-900 text-white"
                />
                <span className="text-zinc-300">No</span>
              </label>
            </div>
          </div>

          {formData.existingWebsite === "yes" && (
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-2">Website URL *</label>
              <input
                type="url"
                required
                value={formData.existingWebsiteUrl}
                onChange={(e) => setFormData({ ...formData, existingWebsiteUrl: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="https://example.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Timeline *</label>
            <select
              required
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select a timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="1–2 weeks">1–2 weeks</option>
              <option value="3–4 weeks">3–4 weeks</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Budget Range *</label>
            <select
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select a budget range</option>
              <option value="Under $150">Under $150</option>
              <option value="$150–$300">$150–$300</option>
              <option value="$300–$600">$300–$600</option>
              <option value="$600–$1,000+">$600–$1,000+</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              Where did you hear about ZeroRender? *
            </label>
            <select
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select source</option>
              <option value="Groupon">Groupon</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">Additional Information</label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white min-h-[80px]"
              placeholder="Optional details..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-white text-black rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
