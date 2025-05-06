"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type ToastType = "success" | "error" | "warning" | "info"

type Toast = {
  type: ToastType
  title: string
  message: string
  duration?: number
}

type ToastContextType = {
  toast: Toast | null
  showToast: (toast: Toast) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = useCallback((newToast: Toast) => {
    setToast(newToast)
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
