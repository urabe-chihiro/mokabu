import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            Mokabu
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            モダンな技術スタックで構築された
            <br />
            株式投資のポートフォリオ管理アプリケーション
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>📊 ポートフォリオ管理</CardTitle>
              <CardDescription>
                保有株式の一覧表示・追加・編集・削除
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portfolio">
                <Button className="w-full">ポートフォリオを見る</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💰 損益計算</CardTitle>
              <CardDescription>
                リアルタイムでの評価損益の自動計算
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                近日公開
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">技術スタック</h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Tailwind CSS',
              'shadcn/ui',
              'tRPC',
              'Prisma',
              'SQLite',
              'Turborepo',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
