import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/lib/trpc/Provider'
import { SessionProvider } from '@/lib/SessionProvider'
import { Header } from '@/components/Header'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

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
      <body className={notoSansJP.variable}>
        <SessionProvider>
          <TRPCProvider>
            <Header />
            {children}
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
