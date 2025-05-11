export function detectUserLocationSimple() {
  // This is a simple implementation that uses browser timezone
  // In a production environment, you might want to use a more robust solution
  // like a geolocation API or IP-based location detection

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Check if the timezone is likely in Egypt
  const isEgypt = timezone.includes("Cairo") || timezone.includes("Egypt")

  return {
    country: isEgypt ? "Egypt" : "Unknown",
    isEgypt,
  }
}
