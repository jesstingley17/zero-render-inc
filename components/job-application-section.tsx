"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

export default function JobApplicationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resume, setResume] = useState<File | null>(null)
  const [portfolio, setPortfolio] = useState<File | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 10MB" })
        setTimeout(() => setMessage(null), 5000)
        return
      }
      setResume(file)
    }
  }

  const handlePortfolioUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 10MB" })
        setTimeout(() => setMessage(null), 5000)
        return
      }
      setPortfolio(file)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

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

      setMessage({ type: "success", text: "Application submitted successfully! We'll be in touch soon." })
      e.currentTarget.reset()
      setResume(null)
      setPortfolio(null)
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Job application error:", error)
      setMessage({
        type: "error",
        text: `Failed to submit application: ${error instanceof Error ? error.message : "Please try again."}`,
      })
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

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-500/20 border border-green-500/50 text-green-200"
                : "bg-red-500/20 border border-red-500/50 text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

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
              <div>
                <label htmlFor="linkedin" className="text-white/80 mb-2 block text-sm">
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label htmlFor="github" className="text-white/80 mb-2 block text-sm">
                  GitHub Profile
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="https://github.com/yourusername"
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

            <div>
              <label className="text-white/80 mb-3 block text-sm">Work Preference</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="workPreference"
                    value="remote"
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">Remote</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="workPreference"
                    value="onsite"
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">On-site</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="workPreference"
                    value="hybrid"
                    className="w-4 h-4 border-white/20 text-white"
                  />
                  <span className="text-white/70">Hybrid</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="text-white/80 mb-2 block text-sm">
                Salary Expectation
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="e.g., $50,000 - $70,000"
              />
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
              <div>
                <label htmlFor="designTools" className="text-white/80 mb-2 block text-sm">
                  Design Tools
                </label>
                <input
                  id="designTools"
                  name="designTools"
                  type="text"
                  placeholder="e.g., Figma, Adobe XD, Sketch"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="otherSkills" className="text-white/80 mb-2 block text-sm">
                  Other Skills
                </label>
                <input
                  id="otherSkills"
                  name="otherSkills"
                  type="text"
                  placeholder="e.g., Project management, UI/UX design"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Experience
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="recentRole" className="text-white/80 mb-2 block text-sm">
                  Most Recent Role / Title
                </label>
                <input
                  id="recentRole"
                  name="recentRole"
                  type="text"
                  placeholder="e.g., Senior Web Developer"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-white/80 mb-2 block text-sm">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="e.g., Tech Company Inc."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="employmentDates" className="text-white/80 mb-2 block text-sm">
                  Employment Dates
                </label>
                <input
                  id="employmentDates"
                  name="employmentDates"
                  type="text"
                  placeholder="e.g., Jan 2020 - Present"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="responsibilities" className="text-white/80 mb-2 block text-sm">
                  Key Responsibilities
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={4}
                  placeholder="Describe your main responsibilities and achievements..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="institution" className="text-white/80 mb-2 block text-sm">
                  Institution
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder="e.g., University Name"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="degree" className="text-white/80 mb-2 block text-sm">
                  Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  type="text"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="graduationYear" className="text-white/80 mb-2 block text-sm">
                  Graduation Year
                </label>
                <input
                  id="graduationYear"
                  name="graduationYear"
                  type="text"
                  placeholder="e.g., 2020"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
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
                  Why do you want to join ZeroRender? *
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                  placeholder="Tell us what excites you about working with us..."
                />
              </div>
              <div>
                <label htmlFor="proudProject" className="text-white/80 mb-2 block text-sm">
                  Proudest Project
                </label>
                <textarea
                  id="proudProject"
                  name="proudProject"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                  placeholder="Describe a project you're particularly proud of..."
                />
              </div>
              <div>
                <label htmlFor="philosophy" className="text-white/80 mb-2 block text-sm">
                  Your Design/Development Philosophy
                </label>
                <textarea
                  id="philosophy"
                  name="philosophy"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-y"
                  placeholder="Share your approach to design and development..."
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-light text-white border-b border-white/10 pb-3">
              Additional Information
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="text-white/80 mb-3 block text-sm">Work Authorization *</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workAuthorization"
                      value="authorized"
                      defaultChecked
                      required
                      className="w-4 h-4 border-white/20 text-white"
                    />
                    <span className="text-white/70">Authorized to work in US</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workAuthorization"
                      value="sponsorship-required"
                      className="w-4 h-4 border-white/20 text-white"
                    />
                    <span className="text-white/70">Require sponsorship</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-white/80 mb-3 block text-sm">Sponsorship Needed</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sponsorship"
                      value="yes"
                      className="w-4 h-4 border-white/20 text-white"
                    />
                    <span className="text-white/70">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sponsorship"
                      value="no"
                      defaultChecked
                      className="w-4 h-4 border-white/20 text-white"
                    />
                    <span className="text-white/70">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="hearAbout" className="text-white/80 mb-2 block text-sm">
                  How did you hear about us?
                </label>
                <input
                  id="hearAbout"
                  name="hearAbout"
                  type="text"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="e.g., LinkedIn, job board, referral"
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
