import { Box, List, ListItem, ListItemButton, ListItemText, Collapse, Typography, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navigation } from '../../lib/navigation';

const DRAWER_WIDTH = 280;

function SidebarContent() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({});

  // Auto-expand section containing current page
  useEffect(() => {
    for (const section of navigation) {
      for (const link of section.links) {
        if (router.asPath === link.href || router.asPath.startsWith(link.href + '/')) {
          setOpenSections((prev) => ({ ...prev, [section.title]: true }));
          break;
        }
      }
    }
  }, [router.asPath]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box sx={{ py: 2 }}>
      {navigation.map((section) => (
        <Box key={section.title} sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => toggleSection(section.title)}
            sx={{ py: 0.5 }}
          >
            <ListItemText
              primary={section.title}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'text.secondary',
              }}
            />
            {openSections[section.title] ? (
              <ExpandLess sx={{ fontSize: 18, color: 'text.secondary' }} />
            ) : (
              <ExpandMore sx={{ fontSize: 18, color: 'text.secondary' }} />
            )}
          </ListItemButton>
          <Collapse in={openSections[section.title]} timeout="auto">
            <List component="div" disablePadding>
              {section.links.map((link) => {
                const isActive = router.asPath === link.href;
                return (
                  <Link key={link.href} href={link.href} passHref legacyBehavior>
                    <ListItemButton
                      component="a"
                      sx={{
                        pl: 3,
                        py: 0.5,
                        borderLeft: 2,
                        borderColor: isActive ? 'primary.main' : 'transparent',
                        ml: 2,
                        bgcolor: isActive ? 'action.selected' : 'transparent',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemText
                        primary={link.title}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  const sidebarContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100%',
        overflowY: 'auto',
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <SidebarContent />
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'fixed',
          left: 0,
          top: '64px',
          width: DRAWER_WIDTH,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <SidebarContent />
      </Box>
    </>
  );
}

export { DRAWER_WIDTH };
