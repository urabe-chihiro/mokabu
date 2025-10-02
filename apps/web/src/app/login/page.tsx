'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardContent, Input, Label, Alert, AlertDescription, Separator } from '@/components/ui'
import { Chrome } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('メールアドレスまたはパスワードが正しくありません')
      } else {
        router.push('/portfolio')
        router.refresh()
      }
    } catch {
      setError('ログインに失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setIsLoading(true)
    
    try {
      await signIn('google', { callbackUrl: '/portfolio' })
    } catch {
      setError('Googleログインに失敗しました')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center bg-background">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            ログイン
          </h1>
          <p className="text-muted-foreground">
            Mokabuへようこそ
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Googleログインボタン */}
            <Button
              variant="outline"
              className="w-full h-12 mb-6"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Googleでログイン
            </Button>

            <div className="flex items-center my-6">
              <Separator className="flex-1" />
              <span className="px-3 text-sm text-muted-foreground">または</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? 'ログイン中...' : 'ログイン'}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                アカウントをお持ちでないですか？{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  新規登録
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

