"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { toast } from "sonner"

export const JobApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resume, setResume] = useState<File | null>(null)
  const [portfolio, setPortfolio] = useState<File | null>(null)

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB")
        return
      }
      setResume(file)
      toast.success(`Resume uploaded: ${file.name}`)
    }
  }

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB")
        return
      }
      setPortfolio(file)
      toast.success(`Portfolio uploaded: ${file.name}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (resume) formData.append("resume", resume)
      if (portfolio) formData.append("portfolio", portfolio)

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      toast.success("Application submitted successfully!")
      e.currentTarget.reset()
      setResume(null)
      setPortfolio(null)
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-32 border-t border-white/10 pt-16"
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-light text-white mb-6 text-balance text-center">
          Upload Your Resume Here
        </h3>
        <p className="text-xl text-white/60 mb-12 text-center text-pretty">
          Join our team and help build modern, AI-powered digital experiences for small businesses
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white/80 mb-2 block">
                  Name
                </Label>
                <Input id="name" name="name" required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white/80 mb-2 block">
                  Phone Number
                </Label>
                <Input id="phone" name="phone" type="tel" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="portfolio" className="text-white/80 mb-2 block">
                  Portfolio / Website
                </Label>
                <Input
                  id="portfolio"
                  name="portfolioUrl"
                  type="url"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-white/80 mb-2 block">
                  LinkedIn Profile
                </Label>
                <Input id="linkedin" name="linkedin" type="url" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="github" className="text-white/80 mb-2 block">
                  GitHub or CodeSandbox
                </Label>
                <Input id="github" name="github" type="url" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          </div>

          {/* Position Details */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Position Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="position" className="text-white/80 mb-2 block">
                  Position Applying For
                </Label>
                <Input id="position" name="position" required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="startDate" className="text-white/80 mb-2 block">
                  Preferred Start Date
                </Label>
                <Input id="startDate" name="startDate" type="date" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>

            <div>
              <Label className="text-white/80 mb-3 block">Employment Type</Label>
              <RadioGroup name="employmentType" defaultValue="full-time" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="full-time" className="border-white/20 text-white" />
                  <Label htmlFor="full-time" className="text-white/70 cursor-pointer">
                    Full-time
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="part-time" className="border-white/20 text-white" />
                  <Label htmlFor="part-time" className="text-white/70 cursor-pointer">
                    Part-time
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contract" id="contract" className="border-white/20 text-white" />
                  <Label htmlFor="contract" className="text-white/70 cursor-pointer">
                    Contract
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="internship" id="internship" className="border-white/20 text-white" />
                  <Label htmlFor="internship" className="text-white/70 cursor-pointer">
                    Internship
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="workPreference" className="text-white/80 mb-2 block">
                  Remote / On-site Preference
                </Label>
                <Input id="workPreference" name="workPreference" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="salary" className="text-white/80 mb-2 block">
                  Salary Expectation (Optional)
                </Label>
                <Input id="salary" name="salary" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Technical Skills</h4>
            <div className="space-y-6">
              <div>
                <Label htmlFor="languages" className="text-white/80 mb-2 block">
                  Programming Languages
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  placeholder="e.g., JavaScript, Python, TypeScript"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="frameworks" className="text-white/80 mb-2 block">
                  Frameworks / Libraries
                </Label>
                <Input
                  id="frameworks"
                  name="frameworks"
                  placeholder="e.g., React, Next.js, Node.js"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="designTools" className="text-white/80 mb-2 block">
                  Design Tools (Figma, XD, etc.)
                </Label>
                <Input id="designTools" name="designTools" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="otherSkills" className="text-white/80 mb-2 block">
                  Other Skills / Tech Stack
                </Label>
                <Textarea
                  id="otherSkills"
                  name="otherSkills"
                  rows={3}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="recentRole" className="text-white/80 mb-2 block">
                  Most Recent Role
                </Label>
                <Input id="recentRole" name="recentRole" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="company" className="text-white/80 mb-2 block">
                  Company
                </Label>
                <Input id="company" name="company" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="employmentDates" className="text-white/80 mb-2 block">
                  Dates of Employment
                </Label>
                <Input
                  id="employmentDates"
                  name="employmentDates"
                  placeholder="e.g., Jan 2020 - Present"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="responsibilities" className="text-white/80 mb-2 block">
                  Key Responsibilities / Projects
                </Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="resumeUpload" className="text-white/80 mb-2 block">
                  Upload Resume (PDF, DOCX)
                </Label>
                <div className="relative">
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("resumeUpload")?.click()}
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {resume ? resume.name : "Choose File"}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="portfolioUpload" className="text-white/80 mb-2 block">
                  Attach Portfolio (PDF, ZIP)
                </Label>
                <div className="relative">
                  <input
                    id="portfolioUpload"
                    type="file"
                    accept=".pdf,.zip"
                    onChange={handlePortfolioUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("portfolioUpload")?.click()}
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {portfolio ? portfolio.name : "Choose File"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Education</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="institution" className="text-white/80 mb-2 block">
                  Institution
                </Label>
                <Input id="institution" name="institution" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="degree" className="text-white/80 mb-2 block">
                  Degree or Certificate
                </Label>
                <Input id="degree" name="degree" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="graduationYear" className="text-white/80 mb-2 block">
                  Graduation Year
                </Label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Short Answer Prompts */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Short Answer Prompts</h4>
            <div className="space-y-6">
              <div>
                <Label htmlFor="whyJoin" className="text-white/80 mb-2 block">
                  Why do you want to join ZeroRender?
                </Label>
                <Textarea id="whyJoin" name="whyJoin" rows={4} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label htmlFor="proudProject" className="text-white/80 mb-2 block">
                  Describe a web project you're most proud of:
                </Label>
                <Textarea
                  id="proudProject"
                  name="proudProject"
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="philosophy" className="text-white/80 mb-2 block">
                  What's your design or coding philosophy?
                </Label>
                <Textarea
                  id="philosophy"
                  name="philosophy"
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h4 className="text-2xl font-light text-white border-b border-white/10 pb-3">Additional Information</h4>
            <div className="space-y-6">
              <div>
                <Label className="text-white/80 mb-3 block">Are you legally authorized to work in the U.S.?</Label>
                <RadioGroup name="workAuthorization" defaultValue="yes" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="auth-yes" className="border-white/20 text-white" />
                    <Label htmlFor="auth-yes" className="text-white/70 cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="auth-no" className="border-white/20 text-white" />
                    <Label htmlFor="auth-no" className="text-white/70 cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/80 mb-3 block">Will you need sponsorship in the future?</Label>
                <RadioGroup name="sponsorship" defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="sponsor-yes" className="border-white/20 text-white" />
                    <Label htmlFor="sponsor-yes" className="text-white/70 cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="sponsor-no" className="border-white/20 text-white" />
                    <Label htmlFor="sponsor-no" className="text-white/70 cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="hearAbout" className="text-white/80 mb-2 block">
                  How did you hear about ZeroRender?
                </Label>
                <Input id="hearAbout" name="hearAbout" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-12 py-6 uppercase tracking-widest text-sm hover:bg-transparent hover:text-white border border-white transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
