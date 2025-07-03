"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type DialogPrimitiveProps = {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type DialogContentProps = {
  children?: React.ReactNode
  className?: string
}

export function Dialog({ open, onOpenChange, children }: DialogPrimitiveProps) {
  return open ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null
}

export function DialogHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("px-6 py-4", className)}>
      <h2 className="text-xl font-semibold text-gray-800">{children}</h2>
    </div>
  )
}

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div className={cn("px-6 py-4", className)}>
      {children}
    </div>
  )
}

export function DialogClose({ children, onClose, className, disabled }: {
  children: React.ReactNode,
  onClose?: () => void,
  className?: string,
  disabled?: boolean
}) {
  return (
    <div
      className={cn(
        "cursor-pointer",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      onClick={!disabled ? onClose : undefined}
    >
      {children}
    </div>
  )
}

export function DialogFooter({ children, className }: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 py-4", className)}>
      {children}
    </div>
  )
}
