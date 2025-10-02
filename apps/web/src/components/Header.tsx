'use client'

import { Button, Avatar, AvatarFallback } from '@/components/ui'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        <Link
          href="/"
          className="text-lg font-bold text-foreground no-underline"
        >
          Mokabu
        </Link>

        {status === 'loading' ? null : session ? (
          <div className="flex items-center gap-4 ml-auto">
            <Button asChild variant="ghost">
              <Link href="/portfolio">
                ポートフォリオ
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">
                {session.user?.name || session.user?.email}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 ml-auto">
            <Button asChild variant="ghost">
              <Link href="/login">
                ログイン
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">
                新規登録
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

