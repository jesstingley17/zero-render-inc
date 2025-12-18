import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

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
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize email to prevent XSS
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }

    const sanitizedEmail = sanitizeHtml(email)

    // Send notification to founders about new newsletter subscriber
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: "ZeroRender <hello@zero-render.com>",
      to: ["jtingley@zero-render.com", "tplymale@zero-render.com", "kara@zero-render.com"],
      subject: "New Newsletter Subscription",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #000; margin-top: 0;">New Newsletter Subscriber</h2>
            <p style="color: #333;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="color: #333;"><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `,
      tags: [{ name: "type", value: "newsletter" }],
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to subscribe", details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Newsletter subscribe error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
