import { featureFlags } from "@/app/config"

export function isMainSiteEnabled(): boolean {
  return featureFlags.mainSiteEnabled
}

export function isWorkshopPaymentEnabled(): boolean {
  return featureFlags.workshopPaymentEnabled
}
