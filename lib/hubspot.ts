// HubSpot CRM integration helper functions
// Syncs contacts to HubSpot CRM after Resend email sends

interface HubSpotContactProperties {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  source?: string
  resendMessageId?: string // Resend email message ID
  lastEmailSentDate?: string // ISO date string
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
    // Build properties object with proper HubSpot field mapping
    const hubspotProperties: Record<string, any> = {
      email: properties.email,
    }

    // Standard contact fields
    if (properties.firstname) {
      hubspotProperties.firstname = properties.firstname
    }
    if (properties.lastname) {
      hubspotProperties.lastname = properties.lastname
    }
    if (properties.phone) {
      hubspotProperties.phone = properties.phone
    }

    // Source tracking - set analytics source and lead status
    if (properties.source) {
      hubspotProperties.hs_analytics_source = properties.source
      hubspotProperties.hs_lead_status = "NEW"
      // Also set a custom "source" property for easy filtering
      hubspotProperties.source = "resend"
    }

    // Resend-specific tracking fields
    if (properties.resendMessageId) {
      hubspotProperties.resend_last_message_id = properties.resendMessageId
    }
    if (properties.lastEmailSentDate) {
      hubspotProperties.resend_last_email_sent_date = properties.lastEmailSentDate
    }

    // Add any additional custom properties (excluding reserved fields)
    const reservedFields = ["email", "firstname", "lastname", "phone", "source", "resendMessageId", "lastEmailSentDate"]
    Object.entries(properties).forEach(([key, value]) => {
      if (!reservedFields.includes(key) && value !== undefined && value !== null) {
        // Convert camelCase to snake_case for HubSpot custom properties
        const hubspotKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
        hubspotProperties[hubspotKey] = value
      }
    })

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: hubspotProperties,
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

