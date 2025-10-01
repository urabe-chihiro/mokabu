import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth } = req
  const isLoggedIn = !!auth?.user
  const pathname = nextUrl.pathname

  console.log('[Middleware]', { pathname, isLoggedIn })

  // 認証関連のパス
  const authPaths = ['/login', '/signup']
  const isAuthPath = authPaths.includes(pathname)

  // ログイン済みユーザーが認証ページにアクセス → ルートにリダイレクト
  if (isLoggedIn && isAuthPath) {
    console.log('[Middleware] Logged in user accessing auth page -> redirect to /')
    return NextResponse.redirect(new URL('/', nextUrl.origin))
  }

  // 未認証ユーザーが保護されたページにアクセス → ログインページにリダイレクト
  if (!isLoggedIn && !isAuthPath) {
    console.log('[Middleware] Unauthenticated user accessing protected page -> redirect to /login')
    const loginUrl = new URL('/login', nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
