"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

export default function JobApplicationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resume, setResume] = useState<File | null>(null)
  const [portfolio, setPortfolio] = useState<File | null>(null)

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      setResume(file)
    }
  }

  const handlePortfolioUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      setPortfolio(file)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (resume) formData.set("resume", resume)
      if (portfolio) formData.set("portfolio", portfolio)

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit")
      }

      alert("Application submitted successfully! We'll be in touch soon.")
      e.currentTarget.reset()
      setResume(null)
      setPortfolio(null)
    } catch (error) {
      console.error("[v0] Job application error:", error)
      alert(`Failed to submit application: ${error instanceof Error ? error.message : "Please try again."}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="join-team"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-900/50 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6 text-balance text-center">
          Join Our Team
        </h2>
        <p className="text-lg sm:text-xl text-white/60 mb-8 sm:mb-12 text-center text-pretty">
          Help us build modern, AI-powered digital experiences for small businesses
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="text-white/80 mb-2 block text-sm">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white/80 mb-2 block text-sm">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-white/80 mb-2 block text-sm">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="portfolioUrl" className="text-white/80 mb-2 block text-sm">
                  Portfolio / Website
                </label>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Position Details */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Position Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="position" className="text-white/80 mb-2 block text-sm">
                  Position Applying For *
                </label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="e.g., Web Developer, Designer"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="text-white/80 mb-2 block text-sm">
                  Preferred Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 mb-3 block text-sm">Employment Type *</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="employmentType"
                    value="full-time"
                    defaultChecked
                    required
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">Full-time</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="employmentType"
                    value="part-time"
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">Part-time</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="employmentType"
                    value="contract"
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">Contract</span>
                </label>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Technical Skills
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="languages" className="text-white/80 mb-2 block text-sm">
                  Programming Languages
                </label>
                <input
                  id="languages"
                  name="languages"
                  type="text"
                  placeholder="e.g., JavaScript, Python, TypeScript"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="frameworks" className="text-white/80 mb-2 block text-sm">
                  Frameworks / Libraries
                </label>
                <input
                  id="frameworks"
                  name="frameworks"
                  type="text"
                  placeholder="e.g., React, Next.js, Node.js"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="resumeUpload" className="text-white/80 mb-2 block text-sm">
                  Upload Resume (PDF, DOCX)
                </label>
                <div className="relative">
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("resumeUpload")?.click()}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {resume ? resume.name : "Choose File"}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="portfolioUpload" className="text-white/80 mb-2 block text-sm">
                  Attach Portfolio (PDF, ZIP)
                </label>
                <div className="relative">
                  <input
                    id="portfolioUpload"
                    type="file"
                    accept=".pdf,.zip"
                    onChange={handlePortfolioUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("portfolioUpload")?.click()}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {portfolio ? portfolio.name : "Choose File"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Short Answer Prompts */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Tell Us About Yourself
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="whyJoin" className="text-white/80 mb-2 block text-sm">
                  Why do you want to join ZeroRender?
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                />
              </div>
              <div>
                <label htmlFor="experience" className="text-white/80 mb-2 block text-sm">
                  Tell us about your relevant experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-8 sm:px-12 py-4 sm:py-6 uppercase tracking-widest text-sm hover:bg-transparent hover:text-white border border-white transition-all duration-300 disabled:opacity-50 rounded-md touch-manipulation min-h-[48px]"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
