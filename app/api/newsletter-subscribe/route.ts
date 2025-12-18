import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import { upsertHubSpotContact } from "@/lib/hubspot"

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

    const resend = getResend()

    // Send confirmation email to subscriber
    const confirmationEmail = await resend.emails.send({
      from: "ZeroRender <hello@zero-render.com>",
      to: [email],
      subject: "Welcome to ZeroRender Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #000; margin-top: 0; font-size: 28px;">Welcome to ZeroRender!</h1>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to our newsletter. You're now part of our community and will receive:
            </p>
            <ul style="color: #333; font-size: 16px; line-height: 1.8; padding-left: 20px;">
              <li>Latest updates on AI-powered tools and features</li>
              <li>Design trends and best practices</li>
              <li>Tips to grow your business online</li>
              <li>Exclusive offers and early access to new services</li>
            </ul>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              We're excited to share valuable insights with you. Stay tuned for our next update!
            </p>
            <hr style="border: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              If you didn't subscribe to this newsletter, you can safely ignore this email.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              ZeroRender, Inc.<br>
              <a href="https://www.zero-render.com" style="color: #000;">www.zero-render.com</a>
            </p>
          </div>
        </body>
        </html>
      `,
      tags: [{ name: "type", value: "newsletter-confirmation" }],
    })

    if (confirmationEmail.error) {
      console.error("Confirmation email error:", confirmationEmail.error)
      // Continue anyway - we'll still notify the team
    }

    // Send notification to founders about new newsletter subscriber
    const notificationEmail = await resend.emails.send({
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

    if (notificationEmail.error) {
      console.error("Notification email error:", notificationEmail.error)
      return NextResponse.json(
        { error: notificationEmail.error.message || "Failed to subscribe", details: notificationEmail.error },
        { status: 500 }
      )
    }

    // Sync contact to HubSpot after successful email send
    if (confirmationEmail.data && email) {
      await upsertHubSpotContact({
        email: email,
        source: "newsletter",
        resendMessageId: confirmationEmail.data.id, // Resend message ID
        lastEmailSentDate: new Date().toISOString(),
        newsletter_subscribed: "true",
        newsletter_subscription_date: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, data: notificationEmail.data })
  } catch (error) {
    console.error("Newsletter subscribe error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
