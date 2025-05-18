export const FEATURES = {
  // Set to false to hide the main site and only show the workshop landing page
  MAIN_SITE_ENABLED: false,

  // Set to true when the workshop payment page is ready
  WORKSHOP_PAYMENT_ENABLED: false,
}

// Helper function to check if a feature is enabled
export function isFeatureEnabled(featureName: keyof typeof FEATURES): boolean {
  return FEATURES[featureName] === true
}
