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
    const { email, message, type, packageTitle } = body

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 })
    }

    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: "ZeroRender <onboarding@resend.dev>",
      to: ["jtingley@zero-render.com", "tplymale@zero-render.com", "kara@zero-render.com"],
      replyTo: email,
      subject: `New ${type === "inquiry" ? "Inquiry" : "Contact"}: ${packageTitle || "General"}`,
      text: `From: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Package/Service:</strong> ${packageTitle || "General Inquiry"}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
