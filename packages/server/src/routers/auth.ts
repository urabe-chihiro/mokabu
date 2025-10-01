import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@mokabu/database'
import bcrypt from 'bcryptjs'
import { TRPCError } from '@trpc/server'

export const authRouter = router({
  // サインアップ
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email('有効なメールアドレスを入力してください'),
        password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
        name: z.string().min(1, '名前を入力してください'),
      })
    )
    .mutation(async ({ input }) => {
      // メールアドレスの重複チェック
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'このメールアドレスは既に登録されています',
        })
      }

      // パスワードをハッシュ化
      const hashedPassword = await bcrypt.hash(input.password, 10)

      // ユーザーを作成
      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      })

      return {
        success: true,
        user,
      }
    }),

  // 現在のユーザー情報を取得
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'ユーザーが見つかりません',
      })
    }

    return user
  }),
})

