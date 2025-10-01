import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 シードデータを投入中...')

  // ユーザーを作成
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'デモユーザー',
    },
  })

  console.log('✅ ユーザーを作成:', user.email)

  // ポートフォリオを作成
  const portfolio1 = await prisma.portfolio.upsert({
    where: { id: 'demo-portfolio-1' },
    update: {},
    create: {
      id: 'demo-portfolio-1',
      name: '日本株ポートフォリオ',
      description: '日本の主要企業への投資',
      initialAmount: 1000000,
      userId: user.id,
    },
  })

  const portfolio2 = await prisma.portfolio.upsert({
    where: { id: 'demo-portfolio-2' },
    update: {},
    create: {
      id: 'demo-portfolio-2',
      name: 'テクノロジー銘柄',
      description: 'IT・テクノロジー企業への投資',
      initialAmount: 500000,
      userId: user.id,
    },
  })

  console.log('✅ ポートフォリオを作成:', portfolio1.name, portfolio2.name)

  // 株式を追加
  const stocks = [
    {
      symbol: '7203',
      name: 'トヨタ自動車',
      quantity: 100,
      buyPrice: 2500,
      currentPrice: 2650,
      sector: '自動車',
      portfolioId: portfolio1.id,
    },
    {
      symbol: '6758',
      name: 'ソニーグループ',
      quantity: 50,
      buyPrice: 12000,
      currentPrice: 12500,
      sector: '電気機器',
      portfolioId: portfolio1.id,
    },
    {
      symbol: '9984',
      name: 'ソフトバンクグループ',
      quantity: 20,
      buyPrice: 5800,
      currentPrice: 6000,
      sector: '情報・通信',
      portfolioId: portfolio2.id,
    },
    {
      symbol: '4063',
      name: '信越化学工業',
      quantity: 30,
      buyPrice: 4200,
      currentPrice: 4100,
      sector: '化学',
      portfolioId: portfolio1.id,
    },
  ]

  for (const stock of stocks) {
    await prisma.stock.create({
      data: stock,
    })
  }

  console.log('✅ 株式を追加:', stocks.length, '銘柄')
  console.log('🎉 シードデータの投入が完了しました！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ エラー:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

