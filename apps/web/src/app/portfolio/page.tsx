import { Box, Container, Typography } from '@mui/material'
import { PortfolioList } from '@/features/portfolio/components/PortfolioList'
import { auth } from '@/lib/auth'
import { createCaller } from '@mokabu/server'
import { redirect } from 'next/navigation'
import type { PortfolioList as PortfolioListType } from '@/lib/trpc/types'

export default async function PortfolioPage() {
  // Server Componentで認証チェック
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  // Server Componentで初期データを取得
  const caller = createCaller({ session })
  
  // イミュータブルな実装（エラー時は空配列を返す）
  const initialData: PortfolioListType = await caller.portfolio
    .getAll()
    .catch((error) => {
      console.error('Failed to fetch portfolios:', error)
      return []
    })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
            ポートフォリオ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            保有している株式ポートフォリオの一覧
          </Typography>
        </Box>
        <PortfolioList initialData={initialData} />
      </Container>
    </Box>
  )
}
