import type { Metadata } from 'next'
import './globals.css'
import { TRPCProvider } from '@/lib/trpc/Provider'
import { ThemeRegistry } from '@/lib/ThemeRegistry'
import { SessionProvider } from '@/lib/SessionProvider'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Mokabu - 株式ポートフォリオ管理',
  description: 'モダンな技術スタックで構築された株式投資のポートフォリオ管理アプリケーション',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          <ThemeRegistry>
            <TRPCProvider>
              <Header />
              {children}
            </TRPCProvider>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
