'use client'

import { trpc } from '@/lib/trpc/Provider'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function PortfolioList() {
  const { data: portfolios, isLoading, error } = trpc.portfolio.getAll.useQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-neutral-600 dark:text-neutral-400">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">エラー: {error.message}</div>
      </div>
    )
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            ポートフォリオがまだありません
          </p>
          <Button>新規作成</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{portfolio.name}</CardTitle>
                <CardDescription className="mt-1">
                  {portfolio.stocks.length} 銘柄
                </CardDescription>
              </div>
              <Badge variant={portfolio.totalProfit >= 0 ? 'default' : 'destructive'}>
                {portfolio.totalProfit >= 0 ? '+' : ''}
                {portfolio.profitRate.toFixed(2)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">評価額</span>
                <span className="font-semibold">
                  ¥{portfolio.totalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">取得額</span>
                <span>¥{portfolio.totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">損益</span>
                <span
                  className={
                    portfolio.totalProfit >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }
                >
                  {portfolio.totalProfit >= 0 ? '+' : ''}
                  ¥{portfolio.totalProfit.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link href={`/portfolio/${portfolio.id}`}>
                <Button variant="outline" className="w-full">
                  詳細を見る
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

