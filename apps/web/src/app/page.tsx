import Link from 'next/link'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { BarChart3, DollarSign } from 'lucide-react'

export default function HomePage() {
  const techStack = [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'shadcn/ui',
    'tRPC',
    'Prisma',
    'NextAuth.js',
    'SQLite',
    'Turborepo',
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Mokabu
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            モダンな技術スタックで構築された
            <br />
            株式投資のポートフォリオ管理アプリケーション
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-10 h-10 text-primary mr-3" />
                <h2 className="text-xl font-semibold">
                  ポートフォリオ管理
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                保有株式の一覧表示・追加・編集・削除
              </p>
              <Button asChild className="w-full h-12">
                <Link href="/portfolio">
                  ポートフォリオを見る
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-10 h-10 text-primary mr-3" />
                <h2 className="text-xl font-semibold">
                  損益計算
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                リアルタイムでの評価損益の自動計算
              </p>
              <Button
                variant="outline"
                className="w-full h-12"
                disabled
              >
                近日公開
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 技術スタック */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            技術スタック
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
