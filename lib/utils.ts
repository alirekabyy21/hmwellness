import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(time: string): string {
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12

  return `${hour12}:${minutes} ${ampm}`
}

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
