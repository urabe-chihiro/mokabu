import { router } from '../trpc'
import { portfolioRouter } from './portfolio'
import { stockRouter } from './stock'

export const appRouter = router({
  portfolio: portfolioRouter,
  stock: stockRouter,
})

export type AppRouter = typeof appRouter

