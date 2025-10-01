import { router } from '../trpc'
import { portfolioRouter } from './portfolio'
import { stockRouter } from './stock'
import { authRouter } from './auth'

export const appRouter = router({
  auth: authRouter,
  portfolio: portfolioRouter,
  stock: stockRouter,
})

export type AppRouter = typeof appRouter

