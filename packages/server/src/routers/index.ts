import { router } from '../trpc'
import { portfolioRouter } from './portfolio'
import { stockRouter } from './stock'
import { authRouter } from './auth'
import type { Context } from '../trpc'

export const appRouter = router({
  auth: authRouter,
  portfolio: portfolioRouter,
  stock: stockRouter,
})

export type AppRouter = typeof appRouter

// Server Componentで使うためのcaller作成関数
export const createCaller = (context: Context) => {
  return appRouter.createCaller(context)
}

