"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { wagmiConfig } from "@/utils/contract-utils"
import { WalletProvider } from "@/context/wallet-context"
import { NotificationProvider } from "@/context/notification-context"
import { ToastProvider } from "@/context/toast-context"
import { Notification } from "@/components/ui/notification"
import { WalletModalContainer } from "@/components/wallet-modal-container"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ToastProvider>
            <WalletProvider>
              {children}
              <Notification />
              <WalletModalContainer />
              <Analytics />
              <SpeedInsights />
            </WalletProvider>
          </ToastProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
