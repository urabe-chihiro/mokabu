import type { AppRouter } from '@mokabu/server'
import type { inferRouterOutputs } from '@trpc/server'

// tRPCルーターから型を自動推論
export type RouterOutputs = inferRouterOutputs<AppRouter>

// 各エンドポイントの型をエクスポート
export type PortfolioList = RouterOutputs['portfolio']['getAll']
export type Portfolio = PortfolioList[number]
export type User = RouterOutputs['auth']['me']

