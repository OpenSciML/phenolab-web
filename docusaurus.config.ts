import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PhenoLab',
  tagline: 'Crop phenotyping workspace for field studies, imagery, pipelines, and derived data products.',
  favicon: 'img/phenolab-logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://opensciml.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/phenolab-web/',
  deploymentBranch: "main",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OpenSciML',
  projectName: 'phenolab-web',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/OpenSciML/phenolab-web/tree/main/',
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'blog',
          blogTitle: 'PhenoLab Blog',
          blogDescription: 'Project updates, release notes, and development notes from PhenoLab.',
          editUrl:
            'https://github.com/OpenSciML/phenolab-web/tree/main/',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/phenolab-logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'PhenoLab',
      logo: {
        alt: 'PhenoLab logo',
        src: 'img/phenolab-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/OpenSciML/phenolab-web',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment/docker-compose',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Dataset Editor',
              to: '/docs/features/dataset-editor',
            },
            {
              label: 'Analysis Modules',
              to: '/docs/features/analysis-modules',
            },
            {
              label: 'Analysis Pipelines',
              to: '/docs/features/analysis-pipelines',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Troubleshooting',
              to: '/docs/troubleshooting',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OpenSciML/phenolab-web',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PhenoLab contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
