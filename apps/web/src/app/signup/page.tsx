'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/Provider'
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link as MuiLink,
  Divider,
} from '@mui/material'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signupMutation = trpc.auth.signup.useMutation()

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
    } catch (err: any) {
      setError(err.message || '登録に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
            新規登録
          </Typography>
          <Typography variant="body1" color="text.secondary">
            無料でアカウントを作成
          </Typography>
        </Box>

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                label="名前"
                type="text"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                label="メールアドレス"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                label="パスワード"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="6文字以上で入力してください"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{ py: 1.5, mb: 2 }}
              >
                {isLoading ? '登録中...' : '登録する'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>または</Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                既にアカウントをお持ちですか？{' '}
                <MuiLink component={Link} href="/login" underline="hover">
                  ログイン
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

