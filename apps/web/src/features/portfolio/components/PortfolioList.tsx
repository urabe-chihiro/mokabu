'use client'

import { trpc } from '@/lib/trpc/Provider'
import { Button, Card, CardContent, Badge, Alert, AlertDescription } from '@/components/ui'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { PortfolioList as PortfolioListType } from '@/lib/trpc/types'

interface PortfolioListProps {
  initialData?: PortfolioListType
}

export function PortfolioList({ initialData }: PortfolioListProps) {
  const { data: portfolios, isLoading, error } = trpc.portfolio.getAll.useQuery(undefined, {
    initialData: initialData,
    refetchOnMount: false, // 初期データがある場合はマウント時に再取得しない
    staleTime: 60 * 1000, // 1分間はデータを新鮮として扱う
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12">
        <Alert variant="destructive">
          <AlertDescription>エラー: {error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-6">
            ポートフォリオがまだありません
          </p>
          <Button className="h-12">
            新規作成
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => {
        const isProfit = portfolio.totalProfit >= 0

        return (
          <Card
            key={portfolio.id}
            className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <CardContent className="p-6">
              {/* ヘッダー */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {portfolio.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {portfolio.stocks.length} 銘柄
                  </p>
                </div>
                <Badge
                  variant={isProfit ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {isProfit ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {isProfit ? '+' : ''}{portfolio.profitRate.toFixed(2)}%
                </Badge>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between py-1">
                  <p className="text-sm text-muted-foreground">
                    評価額
                  </p>
                  <p className="text-sm font-semibold">
                    ¥{portfolio.totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-sm text-muted-foreground">
                    取得額
                  </p>
                  <p className="text-sm">
                    ¥{portfolio.totalCost.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-sm text-muted-foreground">
                    損益
                  </p>
                  <p
                    className={`text-sm font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {isProfit ? '+' : ''}
                    ¥{portfolio.totalProfit.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* アクション */}
              <Button asChild variant="outline" className="w-full h-12">
                <Link href={`/portfolio/${portfolio.id}`}>
                  詳細を見る
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
