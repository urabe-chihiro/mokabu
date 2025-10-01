import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@mokabu/database'

export const portfolioRouter = router({
  // 全ポートフォリオ取得（ログインユーザーのみ）
  getAll: protectedProcedure.query(async ({ ctx }) => {
      const portfolios = await prisma.portfolio.findMany({
        where: { userId: ctx.userId },
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
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const portfolio = await prisma.portfolio.findUnique({
        where: { 
          id: input.id,
          userId: ctx.userId, // ログインユーザーのポートフォリオのみ
        },
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
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'ポートフォリオ名は必須です'),
        description: z.string().optional(),
        initialAmount: z.number().min(0).default(0),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.portfolio.create({
        data: {
          ...input,
          userId: ctx.userId, // ログインユーザーに紐付け
        },
      })
    }),

  // 更新
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        initialAmount: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input
      return prisma.portfolio.update({
        where: { 
          id,
          userId: ctx.userId, // ログインユーザーのポートフォリオのみ更新可能
        },
        data,
      })
    }),

  // 削除
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.portfolio.delete({
        where: { 
          id: input.id,
          userId: ctx.userId, // ログインユーザーのポートフォリオのみ削除可能
        },
      })
    }),
})

