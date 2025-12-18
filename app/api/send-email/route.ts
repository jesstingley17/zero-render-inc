import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import { upsertHubSpotContact, parseName } from "@/lib/hubspot"

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
    const body = await request.json()
    const { email, message, type, packageTitle, fullName } = body

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize email and message to prevent XSS
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }

    const sanitizedEmail = sanitizeHtml(email)
    const sanitizedMessage = sanitizeHtml(message)
    const sanitizedPackageTitle = packageTitle ? sanitizeHtml(packageTitle) : "General Inquiry"

    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: "ZeroRender <hello@zero-render.com>",
      to: ["jtingley@zero-render.com", "tplymale@zero-render.com", "kara@zero-render.com"],
      replyTo: email,
      subject: `New ${type === "inquiry" ? "Inquiry" : "Contact"}: ${sanitizedPackageTitle}`,
      text: `From: ${email}\n\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #000; margin-top: 0;">New Contact Form Submission</h2>
            <p style="color: #333;"><strong>From:</strong> ${sanitizedEmail}</p>
            <p style="color: #333;"><strong>Package/Service:</strong> ${sanitizedPackageTitle}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${sanitizedMessage.replace(/\n/g, "<br>")}</div>
          </div>
        </body>
        </html>
      `,
      tags: [{ name: "type", value: type || "contact" }],
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send email", details: error },
        { status: 500 }
      )
    }

    // Sync contact to HubSpot after successful email send
    if (data && email) {
      const nameParts = fullName ? parseName(fullName) : {}
      await upsertHubSpotContact({
        email: email,
        firstname: nameParts.firstname,
        lastname: nameParts.lastname,
        source: "contact-form",
        contact_type: type || "inquiry",
        package_interest: packageTitle || "General Inquiry",
        last_contact_date: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
