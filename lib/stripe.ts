import "server-only"

import Stripe from "stripe"

let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured")
    }
    stripeInstance = new Stripe(secretKey)
  }
  return stripeInstance
}
