'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/Provider'
import { Button, Card, CardContent, Input, Label, Alert, AlertDescription, Separator } from '@/components/ui'
import { Chrome } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signupMutation = trpc.auth.signup.useMutation()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // サインアップ
      await signupMutation.mutateAsync({
        name,
        email,
        password,
      })

      // 自動ログイン
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('アカウントは作成されましたが、ログインに失敗しました')
      } else {
        router.push('/portfolio')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            新規登録
          </h1>
          <p className="text-muted-foreground">
            無料でアカウントを作成
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Googleログインボタン */}
            <Button
              variant="outline"
              className="w-full h-12 mb-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Googleで登録
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  または
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  6文字以上で入力してください
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-6"
                disabled={isLoading}
              >
                {isLoading ? '登録中...' : '登録する'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  または
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                既にアカウントをお持ちですか？{' '}
                <Link href="/login" className="text-primary hover:underline">
                  ログイン
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

