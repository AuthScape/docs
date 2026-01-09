import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';

const TOC_WIDTH = 240;

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', lg: 'block' },
        position: 'fixed',
        right: 0,
        top: '64px',
        width: TOC_WIDTH,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        borderLeft: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        py: 3,
        px: 2,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          fontWeight: 600,
          color: 'text.secondary',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        On this page
      </Typography>
      <List dense sx={{ mt: 1 }}>
        {headings.map((heading) => (
          <ListItem key={heading.id} disablePadding>
            <ListItemButton
              component="a"
              href={`#${heading.id}`}
              sx={{
                pl: heading.level === 3 ? 2 : 0,
                py: 0.25,
                borderLeft: 2,
                borderColor: activeId === heading.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <ListItemText
                primary={heading.text}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontSize: '0.8rem',
                  color: activeId === heading.id ? 'primary.main' : 'text.secondary',
                  fontWeight: activeId === heading.id ? 500 : 400,
                  noWrap: true,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export { TOC_WIDTH };
