import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { invoiceId, amount } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify invoice belongs to user
    const { data: invoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .eq("client_id", user.id)
      .single()

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ZeroRender Project Invoice",
              description: `Invoice for project`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/portal/invoices/${invoiceId}/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        invoiceId,
        userId: user.id,
      },
    })

    // Update invoice with session ID
    await supabase.from("invoices").update({ stripe_session_id: session.id }).eq("id", invoiceId)

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error("Payment session error:", error)
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
  }
}
