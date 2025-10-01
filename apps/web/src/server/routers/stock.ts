import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const stockRouter = router({
  // ポートフォリオ内の株式取得
  getByPortfolio: publicProcedure
    .input(z.object({ portfolioId: z.string() }))
    .query(async ({ input }) => {
      const stocks = await prisma.stock.findMany({
        where: { portfolioId: input.portfolioId },
        orderBy: {
          createdAt: 'desc',
        },
      })

      // 評価額と損益を計算
      return stocks.map((stock) => {
        const currentValue = (stock.currentPrice ?? stock.buyPrice) * stock.quantity
        const costValue = stock.buyPrice * stock.quantity
        const profit = currentValue - costValue
        const profitRate = costValue > 0 ? (profit / costValue) * 100 : 0

        return {
          ...stock,
          currentValue,
          costValue,
          profit,
          profitRate,
        }
      })
    }),

  // 株式追加
  create: publicProcedure
    .input(
      z.object({
        symbol: z.string().min(1, '銘柄コードは必須です'),
        name: z.string().min(1, '銘柄名は必須です'),
        quantity: z.number().int().min(1, '数量は1以上である必要があります'),
        buyPrice: z.number().min(0, '購入単価は0以上である必要があります'),
        currentPrice: z.number().min(0).optional(),
        sector: z.string().optional(),
        portfolioId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.stock.create({
        data: input,
      })
    }),

  // 株式更新
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1).optional(),
        buyPrice: z.number().min(0).optional(),
        currentPrice: z.number().min(0).optional(),
        sector: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return prisma.stock.update({
        where: { id },
        data,
      })
    }),

  // 現在価格の更新（一括）
  updatePrices: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          currentPrice: z.number().min(0),
        })
      )
    )
    .mutation(async ({ input }) => {
      const updates = input.map((item) =>
        prisma.stock.update({
          where: { id: item.id },
          data: { currentPrice: item.currentPrice },
        })
      )

      return Promise.all(updates)
    }),

  // 株式削除
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.stock.delete({
        where: { id: input.id },
      })
    }),
})

