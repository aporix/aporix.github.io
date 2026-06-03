import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://aporix.github.io',
  integrations: [
    starlight({
      title: 'Aporix',
      description: 'Systems, network protocols, and agent infrastructure.',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Aporix',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/aporix',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/aporix/aporix.github.io/edit/master/',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Home', slug: 'index' },
            { label: 'Writing System', slug: 'writing-system' },
          ],
        },
        {
          label: 'Systems',
          items: [{ autogenerate: { directory: 'systems' } }],
        },
        {
          label: 'Protocols',
          items: [{ autogenerate: { directory: 'protocols' } }],
        },
        {
          label: 'Agent Infrastructure',
          items: [{ autogenerate: { directory: 'agents' } }],
        },
        {
          label: 'Projects',
          items: [{ autogenerate: { directory: 'projects' } }],
        },
      ],
    }),
  ],
});
