import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import superjson from 'superjson'

// tRPC の初期化
const t = initTRPC.create({
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

// エクスポート
export const router = t.router
export const publicProcedure = t.procedure

