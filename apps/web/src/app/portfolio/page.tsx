import { PortfolioList } from '@/features/portfolio/components/PortfolioList'
import { auth } from '@/lib/auth'
import { createCaller } from '@mokabu/server'
import type { PortfolioList as PortfolioListType } from '@/lib/trpc/types'

export default async function PortfolioPage() {
  // middlewareで認証済みを保証
  const session = await auth()

  // Server Componentで初期データを取得
  const caller = createCaller({ session: session! })
  
  // イミュータブルな実装（エラー時は空配列を返す）
  const initialData: PortfolioListType = await caller.portfolio
    .getAll()
    .catch((error) => {
      console.error('Failed to fetch portfolios:', error)
      return []
    })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">
            ポートフォリオ
          </h1>
          <p className="text-muted-foreground">
            保有している株式ポートフォリオの一覧
          </p>
        </div>
        <PortfolioList initialData={initialData} />
      </div>
    </div>
  )
}
