// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AuthScape Docs',
  tagline: 'Docs',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  // GitHub Pages project site: https://authscape.github.io/docs/
  url: 'https://docs.authscape.io',
  baseUrl: '/',
  organizationName: 'AuthScape',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          // Serve docs at site base so links like /docs/intro resolve under the project base
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/AuthScape/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/AuthScape/docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AuthScape Docs',
      logo: { alt: 'AuthScape Logo', src: 'img/logo.svg' }, // remove or replace if file not present
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/AuthScape/docs', label: 'GitHub', position: 'right' },
      ],
    },
    // ✅ Footer fixed: multi-column with items that use `to`/`href`
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/intro' }, // was { type:'doc', docId:'intro' }
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Issues', href: 'https://github.com/AuthScape/docs/issues' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/AuthScape/docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AuthScape.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
