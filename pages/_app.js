import { ThemeProvider } from '../contexts/ThemeContext';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/mdx/MDXComponents';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}
