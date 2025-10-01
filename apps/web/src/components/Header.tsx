'use client'

import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/login')
    router.refresh()
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Mokabu
        </Typography>

        {session ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              href="/portfolio"
              color="inherit"
            >
              ポートフォリオ
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
              >
                {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
              </Avatar>
              <Typography variant="body2">
                {session.user?.name || session.user?.email}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              href="/login"
              color="inherit"
            >
              ログイン
            </Button>
            <Button
              component={Link}
              href="/signup"
              variant="outlined"
              color="inherit"
            >
              新規登録
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

