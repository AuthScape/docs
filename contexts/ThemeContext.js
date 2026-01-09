import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { createDocsTheme } from '../components/theme/docsTheme';

const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const theme = useMemo(() => createDocsTheme(mode), [mode]);

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
