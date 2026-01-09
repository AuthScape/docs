import { createTheme } from '@mui/material/styles';

export const createDocsTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: { main: '#60a5fa', light: '#93c5fd', dark: '#3b82f6' },
          secondary: { main: '#a78bfa', light: '#c4b5fd', dark: '#8b5cf6' },
          background: { default: '#0f172a', paper: '#1e293b' },
          text: { primary: '#f1f5f9', secondary: '#94a3b8' },
          divider: 'rgba(148, 163, 184, 0.12)',
        }
      : {
          primary: { main: '#2563eb', light: '#3b82f6', dark: '#1d4ed8' },
          secondary: { main: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
          background: { default: '#f8fafc', paper: '#ffffff' },
          text: { primary: '#0f172a', secondary: '#475569' },
          divider: 'rgba(15, 23, 42, 0.08)',
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'code': {
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: '0.875em',
          padding: '0.2em 0.4em',
          borderRadius: '4px',
          backgroundColor: mode === 'dark' ? '#334155' : '#f1f5f9',
        },
        'pre': {
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        },
        'html': {
          scrollBehavior: 'smooth',
          scrollPaddingTop: '80px',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: mode === 'dark' ? '#1e293b' : '#f1f5f9',
        },
        '::-webkit-scrollbar-thumb': {
          background: mode === 'dark' ? '#475569' : '#cbd5e1',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: mode === 'dark' ? '#64748b' : '#94a3b8',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});
