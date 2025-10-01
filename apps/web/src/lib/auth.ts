import NextAuth, { DefaultSession } from 'next-auth'
import { prisma } from '@mokabu/database'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// セッションのユーザー型を拡張
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  debug: true,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        // バリデーション
        const parsedCredentials = z
          .object({
            email: z.string().email('有効なメールアドレスを入力してください'),
            password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
          })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        // ユーザーを検索
        const user = (await prisma.user.findUnique({
          where: { email },
        })) as {
          id: string
          email: string
          name: string | null
          password: string | null
          image: string | null
        } | null

        if (!user || !user.password) {
          return null
        }

        // パスワード検証
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

