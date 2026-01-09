import { AppBar, Toolbar, Typography, IconButton, Box, Button, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon, GitHub } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';

export default function Header({ onMenuClick }) {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Link href="/" passHref legacyBehavior>
          <Box
            component="a"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'text.primary',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AuthScape
            </Typography>
            <Typography
              variant="body2"
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              Docs
            </Typography>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: 'text.primary' }}
            aria-label="Toggle theme"
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton
            component="a"
            href="https://github.com/authscape"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'text.primary' }}
            aria-label="GitHub"
          >
            <GitHub />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
