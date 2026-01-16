import { Typography, Box, Divider, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import CodePlayground from './CodePlayground';
import Callout from './Callout';
import FlowTemplateGenerator from './FlowTemplateGenerator';

// Custom components for MDX
const MDXComponents = {
  // Headings
  h1: (props) => (
    <Typography variant="h1" component="h1" sx={{ mt: 4, mb: 2 }} {...props} />
  ),
  h2: (props) => (
    <Typography
      variant="h2"
      component="h2"
      sx={{ mt: 4, mb: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}
      {...props}
    />
  ),
  h3: (props) => (
    <Typography variant="h3" component="h3" sx={{ mt: 3, mb: 1.5 }} {...props} />
  ),
  h4: (props) => (
    <Typography variant="h4" component="h4" sx={{ mt: 2, mb: 1 }} {...props} />
  ),

  // Paragraphs
  p: (props) => (
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }} {...props} />
  ),

  // Lists
  ul: (props) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }} {...props} />
  ),
  ol: (props) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }} {...props} />
  ),
  li: (props) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.5, lineHeight: 1.7 }} {...props} />
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <MuiLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'primary.main' }}
          {...props}
        >
          {children}
        </MuiLink>
      );
    }
    return (
      <Link href={href || '#'} passHref legacyBehavior>
        <MuiLink sx={{ color: 'primary.main' }} {...props}>
          {children}
        </MuiLink>
      </Link>
    );
  },

  // Code blocks
  pre: ({ children }) => {
    // Extract props from the code element
    const codeElement = children?.props;
    if (codeElement) {
      return (
        <CodeBlock className={codeElement.className}>
          {codeElement.children}
        </CodeBlock>
      );
    }
    return <pre>{children}</pre>;
  },

  code: ({ children, className }) => {
    // Inline code (no className) vs code blocks (with className)
    if (!className) {
      return (
        <Box
          component="code"
          sx={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.875em',
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            bgcolor: 'action.hover',
          }}
        >
          {children}
        </Box>
      );
    }
    return <code className={className}>{children}</code>;
  },

  // Tables
  table: (props) => (
    <Box sx={{ overflowX: 'auto', mb: 2 }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.875rem',
        }}
        {...props}
      />
    </Box>
  ),
  th: (props) => (
    <Box
      component="th"
      sx={{
        p: 1.5,
        textAlign: 'left',
        fontWeight: 600,
        borderBottom: 2,
        borderColor: 'divider',
        bgcolor: 'action.hover',
      }}
      {...props}
    />
  ),
  td: (props) => (
    <Box
      component="td"
      sx={{
        p: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
      }}
      {...props}
    />
  ),

  // Blockquote
  blockquote: (props) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 0.5,
        my: 2,
        fontStyle: 'italic',
        color: 'text.secondary',
        '& p': { m: 0 },
      }}
      {...props}
    />
  ),

  // Horizontal rule
  hr: () => <Divider sx={{ my: 4 }} />,

  // Strong and emphasis
  strong: (props) => (
    <Box component="strong" sx={{ fontWeight: 600 }} {...props} />
  ),
  em: (props) => (
    <Box component="em" sx={{ fontStyle: 'italic' }} {...props} />
  ),

  // Custom components
  CodePlayground,
  Callout,
  FlowTemplateGenerator,
};

export default MDXComponents;
