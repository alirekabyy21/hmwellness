"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "bg-background border rounded-md shadow-lg [&[data-state='open']]:animate-in [&[data-state='closed']]:animate-out [&[data-state='closed']]:fade-out-80 [&[data-state='closed']]:zoom-out-95 [&[data-state='open']]:fade-in-100 [&[data-state='open']]:zoom-in-95 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] transition-all duration-150 data-[swipe=end]:!transition-none fixed z-[100] top-0 right-0 m-4",
        className,
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastTrigger = ToastPrimitives.Trigger

const ToastPortal = ToastPrimitives.Portal

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      buttonVariants({ variant: "ghost" }),
      "absolute right-2 top-2 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
      className,
    )}
    {...props}
  />
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-muted-foreground", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm mt-1 text-muted-foreground", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4", className)}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

export { Toast, ToastTrigger, ToastClose, ToastPortal, ToastTitle, ToastDescription, ToastAction }

export type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
}

export type ToastActionElement = React.ReactElement<React.ComponentProps<typeof ToastPrimitives.Action>>

function useToast() {
  return {
    toast: () => {},
  }
}

export { useToast }
