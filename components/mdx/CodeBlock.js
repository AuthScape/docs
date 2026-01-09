import { useState, useCallback } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '../../contexts/ThemeContext';

export default function CodeBlock({ children, className, title, showLineNumbers = false }) {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);

  const language = className?.replace(/language-/, '') || 'text';
  const code = typeof children === 'string' ? children.trim() : '';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <Box sx={{ position: 'relative', my: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 0.75,
          bgcolor: mode === 'dark' ? '#1e293b' : '#f1f5f9',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
          }}
        >
          {title || language}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: 'text.secondary' }}>
            {copied ? (
              <CheckIcon sx={{ fontSize: 16 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Highlight
        theme={mode === 'dark' ? themes.vsDark : themes.vsLight}
        code={code}
        language={language}
      >
        {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            component="pre"
            className={highlightClass}
            sx={{
              ...style,
              m: 0,
              p: 2,
              overflow: 'auto',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            }}
          >
            {tokens.map((line, i) => (
              <Box key={i} {...getLineProps({ line })} sx={{ display: 'table-row' }}>
                {showLineNumbers && (
                  <Box
                    component="span"
                    sx={{
                      display: 'table-cell',
                      pr: 2,
                      color: 'text.disabled',
                      userSelect: 'none',
                      textAlign: 'right',
                      width: '2em',
                    }}
                  >
                    {i + 1}
                  </Box>
                )}
                <Box component="span" sx={{ display: 'table-cell' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  );
}
