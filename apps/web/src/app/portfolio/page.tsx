import { Box, Container, Typography } from '@mui/material'
import { PortfolioList } from '@/features/portfolio/components/PortfolioList'

export default function PortfolioPage() {
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
        <PortfolioList />
      </Container>
    </Box>
  )
}
