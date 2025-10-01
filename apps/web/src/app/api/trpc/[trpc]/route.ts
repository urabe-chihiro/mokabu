import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@mokabu/server'
import { auth } from '@/lib/auth'
import type { Context } from '@mokabu/server'

const handler = async (req: Request) => {
  const session = await auth()

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: (): Context => ({
      session,
    }),
  })
}

export { handler as GET, handler as POST }

