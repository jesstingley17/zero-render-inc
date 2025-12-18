import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract all form fields
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      portfolioUrl: formData.get("portfolioUrl"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
      position: formData.get("position"),
      startDate: formData.get("startDate"),
      employmentType: formData.get("employmentType"),
      workPreference: formData.get("workPreference"),
      salary: formData.get("salary"),
      languages: formData.get("languages"),
      frameworks: formData.get("frameworks"),
      designTools: formData.get("designTools"),
      otherSkills: formData.get("otherSkills"),
      recentRole: formData.get("recentRole"),
      company: formData.get("company"),
      employmentDates: formData.get("employmentDates"),
      responsibilities: formData.get("responsibilities"),
      institution: formData.get("institution"),
      degree: formData.get("degree"),
      graduationYear: formData.get("graduationYear"),
      whyJoin: formData.get("whyJoin"),
      proudProject: formData.get("proudProject"),
      philosophy: formData.get("philosophy"),
      workAuthorization: formData.get("workAuthorization"),
      sponsorship: formData.get("sponsorship"),
      hearAbout: formData.get("hearAbout"),
    }

    const resume = formData.get("resume") as File | null
    const portfolio = formData.get("portfolio") as File | null

    // Convert files to base64 for email attachments
    const attachments: Array<{ filename: string; content: Buffer }> = []

    if (resume) {
      const resumeBuffer = Buffer.from(await resume.arrayBuffer())
      attachments.push({
        filename: resume.name,
        content: resumeBuffer,
      })
    }

    if (portfolio) {
      const portfolioBuffer = Buffer.from(await portfolio.arrayBuffer())
      attachments.push({
        filename: portfolio.name,
        content: portfolioBuffer,
      })
    }

    // Create email HTML
    const emailHtml = `
      <h2>New Job Application Received</h2>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Portfolio:</strong> ${data.portfolioUrl || "Not provided"}</p>
      <p><strong>LinkedIn:</strong> ${data.linkedin || "Not provided"}</p>
      <p><strong>GitHub:</strong> ${data.github || "Not provided"}</p>
      
      <h3>Position Details</h3>
      <p><strong>Position:</strong> ${data.position}</p>
      <p><strong>Start Date:</strong> ${data.startDate || "Not specified"}</p>
      <p><strong>Employment Type:</strong> ${data.employmentType}</p>
      <p><strong>Work Preference:</strong> ${data.workPreference || "Not specified"}</p>
      <p><strong>Salary Expectation:</strong> ${data.salary || "Not provided"}</p>
      
      <h3>Technical Skills</h3>
      <p><strong>Languages:</strong> ${data.languages || "Not provided"}</p>
      <p><strong>Frameworks:</strong> ${data.frameworks || "Not provided"}</p>
      <p><strong>Design Tools:</strong> ${data.designTools || "Not provided"}</p>
      <p><strong>Other Skills:</strong> ${data.otherSkills || "Not provided"}</p>
      
      <h3>Experience</h3>
      <p><strong>Recent Role:</strong> ${data.recentRole || "Not provided"}</p>
      <p><strong>Company:</strong> ${data.company || "Not provided"}</p>
      <p><strong>Dates:</strong> ${data.employmentDates || "Not provided"}</p>
      <p><strong>Responsibilities:</strong><br>${data.responsibilities || "Not provided"}</p>
      
      <h3>Education</h3>
      <p><strong>Institution:</strong> ${data.institution || "Not provided"}</p>
      <p><strong>Degree:</strong> ${data.degree || "Not provided"}</p>
      <p><strong>Graduation Year:</strong> ${data.graduationYear || "Not provided"}</p>
      
      <h3>Short Answers</h3>
      <p><strong>Why ZeroRender?</strong><br>${data.whyJoin || "Not provided"}</p>
      <p><strong>Proudest Project:</strong><br>${data.proudProject || "Not provided"}</p>
      <p><strong>Philosophy:</strong><br>${data.philosophy || "Not provided"}</p>
      
      <h3>Additional Information</h3>
      <p><strong>Work Authorization:</strong> ${data.workAuthorization}</p>
      <p><strong>Sponsorship Needed:</strong> ${data.sponsorship}</p>
      <p><strong>How They Heard About Us:</strong> ${data.hearAbout || "Not provided"}</p>
    `

    // Send email with Resend
    const resend = getResend()
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "ZeroRender Jobs <hello@zero-render.com>",
      to: ["jtingley@zero-render.com", "tplymale@zero-render.com", "kara@zero-render.com"],
      replyTo: data.email || undefined,
      subject: `New Job Application: ${data.position} - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ${emailHtml}
          </div>
        </body>
        </html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (emailError) {
      console.error("Resend email error:", emailError)
      throw new Error("Failed to send application email")
    }

    return NextResponse.json({ success: true, emailId: emailData?.id })
  } catch (error) {
    console.error("Job application submission error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit application" },
      { status: 500 }
    )
  }
}
