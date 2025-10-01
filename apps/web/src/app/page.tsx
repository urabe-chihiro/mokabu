import Link from 'next/link'
import { Box, Container, Typography, Card, CardContent, Button, Chip } from '@mui/material'
import { Dashboard, AttachMoney } from '@mui/icons-material'

export default function HomePage() {
  const techStack = [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Material-UI',
    'tRPC',
    'Prisma',
    'NextAuth.js',
    'SQLite',
    'Turborepo',
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* ヘッダー */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Mokabu
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            モダンな技術スタックで構築された
            <br />
            株式投資のポートフォリオ管理アプリケーション
          </Typography>
        </Box>

        {/* 機能カード */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            mb: 8,
          }}
        >
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Dashboard sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  ポートフォリオ管理
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                保有株式の一覧表示・追加・編集・削除
              </Typography>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                href="/portfolio"
                sx={{ py: 1.5 }}
              >
                ポートフォリオを見る
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  損益計算
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                リアルタイムでの評価損益の自動計算
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                disabled
                sx={{ py: 1.5 }}
              >
                近日公開
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* 技術スタック */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
            技術スタック
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  px: 1,
                  fontSize: '0.875rem',
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
