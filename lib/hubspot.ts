// HubSpot CRM integration helper functions
// Syncs contacts to HubSpot CRM after Resend email sends

interface HubSpotContactProperties {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  source?: string
  [key: string]: any // Allow additional custom properties
}

/**
 * Create or update a contact in HubSpot CRM
 * If a contact with the email already exists, it will be updated
 */
export async function upsertHubSpotContact(properties: HubSpotContactProperties) {
  const apiKey = process.env.HUBSPOT_API_KEY

  if (!apiKey) {
    console.warn("HUBSPOT_API_KEY is not configured, skipping HubSpot contact sync")
    return null
  }

  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: properties.email,
          ...(properties.firstname && { firstname: properties.firstname }),
          ...(properties.lastname && { lastname: properties.lastname }),
          ...(properties.phone && { phone: properties.phone }),
          ...(properties.source && { hs_lead_status: "NEW", hs_analytics_source: properties.source }),
          // Add any additional properties
          ...Object.fromEntries(
            Object.entries(properties).filter(
              ([key]) => !["email", "firstname", "lastname", "phone", "source"].includes(key)
            )
          ),
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("HubSpot API error:", response.status, errorText)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to sync contact to HubSpot:", error)
    // Don't throw - we don't want to fail the email send if HubSpot sync fails
    return null
  }
}

/**
 * Parse a full name into first and last name
 */
export function parseName(fullName: string): { firstname?: string; lastname?: string } {
  if (!fullName || typeof fullName !== "string") {
    return {}
  }

  const trimmed = fullName.trim()
  const parts = trimmed.split(/\s+/)

  if (parts.length === 0) {
    return {}
  }

  if (parts.length === 1) {
    return { firstname: parts[0] }
  }

  // Take first part as firstname, rest as lastname
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  }
}

