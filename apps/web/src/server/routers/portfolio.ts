import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const portfolioRouter = router({
  // 全ポートフォリオ取得
  getAll: publicProcedure
    .input(
      z
        .object({
          userId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const portfolios = await prisma.portfolio.findMany({
        where: input?.userId ? { userId: input.userId } : undefined,
        include: {
          stocks: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      // 評価額と損益を計算
      return portfolios.map((portfolio) => {
        const totalValue = portfolio.stocks.reduce(
          (sum, stock) => sum + (stock.currentPrice ?? stock.buyPrice) * stock.quantity,
          0
        )
        const totalCost = portfolio.stocks.reduce(
          (sum, stock) => sum + stock.buyPrice * stock.quantity,
          0
        )
        const totalProfit = totalValue - totalCost
        const profitRate = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0

        return {
          ...portfolio,
          totalValue,
          totalCost,
          totalProfit,
          profitRate,
        }
      })
    }),

  // ID指定で取得
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: input.id },
        include: {
          stocks: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      if (!portfolio) {
        throw new Error('Portfolio not found')
      }

      const totalValue = portfolio.stocks.reduce(
        (sum, stock) => sum + (stock.currentPrice ?? stock.buyPrice) * stock.quantity,
        0
      )
      const totalCost = portfolio.stocks.reduce(
        (sum, stock) => sum + stock.buyPrice * stock.quantity,
        0
      )
      const totalProfit = totalValue - totalCost
      const profitRate = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0

      return {
        ...portfolio,
        totalValue,
        totalCost,
        totalProfit,
        profitRate,
      }
    }),

  // 作成
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'ポートフォリオ名は必須です'),
        description: z.string().optional(),
        initialAmount: z.number().min(0).default(0),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input,
      })
    }),

  // 更新
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        initialAmount: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return prisma.portfolio.update({
        where: { id },
        data,
      })
    }),

  // 削除
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.delete({
        where: { id: input.id },
      })
    }),
})

