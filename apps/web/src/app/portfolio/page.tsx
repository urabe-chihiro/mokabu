import { PortfolioList } from '@/features/portfolio/components/PortfolioList'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ポートフォリオ</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            保有している株式ポートフォリオの一覧
          </p>
        </div>
        <PortfolioList />
      </div>
    </div>
  )
}

