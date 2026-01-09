import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from './Header';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import TableOfContents, { TOC_WIDTH } from './TableOfContents';

export default function DocsLayout({ children, frontMatter = {}, headings = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
          mr: { xs: 0, lg: `${TOC_WIDTH}px` },
          pt: '64px',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
          {frontMatter.title && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                {frontMatter.title}
              </Typography>
              {frontMatter.description && (
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
                  {frontMatter.description}
                </Typography>
              )}
            </Box>
          )}
          <Box className="mdx-content">{children}</Box>
        </Container>
      </Box>

      <TableOfContents headings={headings} />
    </Box>
  );
}
