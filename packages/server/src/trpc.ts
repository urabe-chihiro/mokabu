import { initTRPC, TRPCError } from '@trpc/server'
import { ZodError } from 'zod'
import superjson from 'superjson'

// コンテキストの型定義
export interface Context {
  session: {
    user: {
      id: string
      email?: string | null
      name?: string | null
    }
  } | null
}

// tRPC の初期化
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// ミドルウェア: 認証チェック
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'ログインが必要です',
    })
  }

  return next({
    ctx: {
      session: ctx.session,
      userId: ctx.session.user.id,
    },
  })
})

// エクスポート
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthenticated)

