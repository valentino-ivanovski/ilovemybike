"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastVariant = "default" | "success" | "error"

interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface ShowToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  showToast: (options: ShowToastOptions) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const VARIANT_STYLES: Record<ToastVariant, string> = {
  default: "border border-zinc-200 bg-white text-zinc-900 shadow-md",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-900 shadow-md",
  error: "border border-red-200 bg-red-50 text-red-900 shadow-md"
}

const DESCRIPTION_STYLES: Record<ToastVariant, string> = {
  default: "text-zinc-600",
  success: "text-emerald-800",
  error: "text-red-800"
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Record<string, number>>({})

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    const timeoutId = timersRef.current[id]
    if (timeoutId) {
      if (typeof window !== "undefined") {
        window.clearTimeout(timeoutId)
      }
      delete timersRef.current[id]
    }
  }, [])

  const showToast = useCallback(
    ({ title, description, variant = "default", duration = 3500 }: ShowToastOptions) => {
      const id = createId()
      setToasts((prev) => [...prev, { id, title, description, variant }])

      if (duration > 0) {
        if (typeof window !== "undefined") {
          const timeoutId = window.setTimeout(() => dismissToast(id), duration)
          timersRef.current[id] = timeoutId
        }
      }
    },
    [dismissToast]
  )

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        Object.values(timersRef.current).forEach((timeoutId) => window.clearTimeout(timeoutId))
      }
      timersRef.current = {}
    }
  }, [])

  const value = useMemo(
    () => ({
      showToast,
      dismissToast
    }),
    [showToast, dismissToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-[9999] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const variantClass = VARIANT_STYLES[toast.variant] ?? VARIANT_STYLES.default
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-lg px-4 py-3 ring-1 ring-black/5 transition-all",
                variantClass
              )}
              role="status"
              aria-live="polite"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description ? (
                  <p className={cn("mt-1 text-xs", DESCRIPTION_STYLES[toast.variant] ?? DESCRIPTION_STYLES.default)}>
                    {toast.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="mt-0.5 rounded-md p-1 text-xs text-zinc-500 transition hover:bg-black/5 hover:text-zinc-700"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
