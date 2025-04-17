export type UserLocation = {
  country: string
  isEgypt: boolean
}

export async function detectUserLocation(): Promise<UserLocation> {
  try {
    // In a real implementation, you would use a geolocation API service
    // like ipinfo.io, ipapi.co, or similar
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()

    return {
      country: data.country_name || "Unknown",
      isEgypt: data.country_code === "EG",
    }
  } catch (error) {
    console.error("Error detecting location:", error)
    // Default to international pricing if location detection fails
    return {
      country: "Unknown",
      isEgypt: false,
    }
  }
}

// Simplified version for client-side use without API calls
export function detectUserLocationSimple(): UserLocation {
  // Check if the browser language starts with 'ar-EG' or contains Egypt-specific indicators
  const browserLanguage = navigator.language || (navigator as any).userLanguage || ""
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""

  const isEgypt = browserLanguage.startsWith("ar-EG") || timeZone === "Africa/Cairo" || timeZone === "Egypt"

  return {
    country: isEgypt ? "Egypt" : "International",
    isEgypt,
  }
}
