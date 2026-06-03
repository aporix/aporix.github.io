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
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/FooterWithComments.astro',
      },
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Home', slug: 'index' },
            { label: 'Writing System', slug: 'writing-system' },
            { label: 'Recent Posts', link: '/posts/' },
            { label: 'Archive', link: '/archive/' },
            { label: 'Tags', link: '/tags/' },
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
