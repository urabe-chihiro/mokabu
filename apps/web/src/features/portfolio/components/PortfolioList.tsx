'use client'

import { trpc } from '@/lib/trpc/Provider'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import Link from 'next/link'
import type { PortfolioList as PortfolioListType } from '@/lib/trpc/types'

interface PortfolioListProps {
  initialData?: PortfolioListType
}

export function PortfolioList({ initialData }: PortfolioListProps) {
  const { data: portfolios, isLoading, error } = trpc.portfolio.getAll.useQuery(undefined, {
    initialData: initialData,
    refetchOnMount: false, // 初期データがある場合はマウント時に再取得しない
    staleTime: 60 * 1000, // 1分間はデータを新鮮として扱う
  })

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 12,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 12 }}>
        <Alert severity="error">エラー: {error.message}</Alert>
      </Box>
    )
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ py: 12, textAlign: 'center' }}>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            ポートフォリオがまだありません
          </Typography>
          <Button variant="contained" size="large">
            新規作成
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {portfolios.map((portfolio) => {
        const isProfit = portfolio.totalProfit >= 0

        return (
          <Card
            key={portfolio.id}
            sx={{
              boxShadow: 3,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              {/* ヘッダー */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" component="h3" fontWeight="bold">
                    {portfolio.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {portfolio.stocks.length} 銘柄
                  </Typography>
                </Box>
                <Chip
                  icon={isProfit ? <TrendingUp /> : <TrendingDown />}
                  label={`${isProfit ? '+' : ''}${portfolio.profitRate.toFixed(2)}%`}
                  color={isProfit ? 'success' : 'error'}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>

              {/* 詳細情報 */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    評価額
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ¥{portfolio.totalValue.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    取得額
                  </Typography>
                  <Typography variant="body2">
                    ¥{portfolio.totalCost.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    損益
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isProfit ? 'success.main' : 'error.main',
                      fontWeight: 'bold',
                    }}
                  >
                    {isProfit ? '+' : ''}
                    ¥{portfolio.totalProfit.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              {/* アクション */}
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                href={`/portfolio/${portfolio.id}`}
                sx={{ py: 1.5 }}
              >
                詳細を見る
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </Box>
  )
}
