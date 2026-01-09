import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Box, Paper, IconButton, Tooltip, Typography, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import { useTheme } from '../../contexts/ThemeContext';

// Dynamically import Monaco to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <CircularProgress size={24} />
    </Box>
  ),
});

export default function CodePlayground({
  initialCode,
  language = 'csharp',
  title,
  readOnly = false,
  height = '300px',
}) {
  const [code, setCode] = useState(initialCode);
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
  }, [initialCode]);

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    readOnly,
    wordWrap: 'on',
    padding: { top: 12, bottom: 12 },
    lineHeight: 1.6,
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  };

  // Map common language names to Monaco language IDs
  const monacoLanguage = {
    csharp: 'csharp',
    cs: 'csharp',
    json: 'json',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    bash: 'shell',
    sh: 'shell',
    shell: 'shell',
    xml: 'xml',
    html: 'html',
    css: 'css',
    sql: 'sql',
  }[language] || language;

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        my: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          bgcolor: mode === 'dark' ? '#1e293b' : '#f1f5f9',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
              color: 'text.secondary',
            }}
          >
            {title || language}
          </Typography>
          {!readOnly && (
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontSize: '0.65rem',
                bgcolor: mode === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                px: 0.75,
                py: 0.25,
                borderRadius: 1,
              }}
            >
              Editable
            </Typography>
          )}
        </Box>
        <Box>
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <IconButton size="small" onClick={handleCopy} sx={{ color: 'text.secondary' }}>
              {copied ? (
                <CheckIcon sx={{ fontSize: 16 }} />
              ) : (
                <ContentCopyIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </Tooltip>
          {!readOnly && (
            <Tooltip title="Reset to original">
              <IconButton size="small" onClick={handleReset} sx={{ color: 'text.secondary' }}>
                <RestoreIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Editor
        height={height}
        language={monacoLanguage}
        value={code}
        theme={mode === 'dark' ? 'vs-dark' : 'light'}
        options={editorOptions}
        onChange={(value) => setCode(value || '')}
      />
    </Paper>
  );
}
