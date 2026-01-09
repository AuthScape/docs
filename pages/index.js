import { Box, Container, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import ExtensionIcon from '@mui/icons-material/Extension';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const features = [
  {
    icon: SettingsIcon,
    title: 'Configuration',
    description: 'Learn about appsettings.json, shared configs, Azure Key Vault, AWS Secrets Manager, and environment variables.',
    href: '/docs/configuration/overview',
  },
  {
    icon: StorageIcon,
    title: 'Database',
    description: 'Switch between SQL Server, PostgreSQL, SQLite, and more with auto-detection from connection strings.',
    href: '/docs/database/overview',
  },
  {
    icon: SecurityIcon,
    title: 'Authentication',
    description: 'OpenIddict-based authentication with OAuth2 flows, claims, and token management.',
    href: '/docs/authentication/overview',
  },
  {
    icon: CodeIcon,
    title: 'API Development',
    description: 'Build secure APIs with protected endpoints, user information access, and Next.js integration.',
    href: '/docs/api-development/overview',
  },
  {
    icon: ExtensionIcon,
    title: 'Plugins',
    description: 'Explore 30+ plugins including Stripe, SendGrid, Content Management, Kanban, and more.',
    href: '/docs/plugins/overview',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Getting Started',
    description: 'Quick start guide to get AuthScape up and running in your project.',
    href: '/docs/getting-started/introduction',
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>AuthScape Documentation</title>
        <meta name="description" content="Complete documentation for AuthScape - Configuration, Database, Authentication, API Development, and Plugins" />
      </Head>

      <Header />

      <Box
        sx={{
          minHeight: '100vh',
          pt: '64px',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        }}
      >
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AuthScape Documentation
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Complete guide to building secure, scalable applications with AuthScape&apos;s authentication and configuration framework.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/docs/getting-started/introduction" passHref legacyBehavior>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/docs/configuration/overview" passHref legacyBehavior>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  }}
                >
                  View Configuration
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={3}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={feature.title}>
                  <Link href={feature.href} passHref legacyBehavior>
                    <Paper
                      component="a"
                      elevation={0}
                      sx={{
                        display: 'block',
                        p: 3,
                        height: '100%',
                        textDecoration: 'none',
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(96, 165, 250, 0.15)'
                            : '0 4px 20px rgba(37, 99, 235, 0.1)',
                        },
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 40,
                          color: 'primary.main',
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            textAlign: 'center',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            AuthScape Documentation
          </Typography>
        </Box>
      </Box>
    </>
  );
}
