import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://aporix.github.io',
  integrations: [
    starlight({
      title: 'Aporix',
      description: 'Systems, network protocols, and agent infrastructure.',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
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
          translations: { 'zh-cn': '开始' },
          items: [
            { label: 'Home', translations: { 'zh-cn': '首页' }, slug: 'index' },
            { label: 'Writing System', translations: { 'zh-cn': '写作系统' }, slug: 'writing-system' },
          ],
        },
        {
          label: 'Systems',
          translations: { 'zh-cn': '系统编程' },
          items: [{ autogenerate: { directory: 'systems' } }],
        },
        {
          label: 'Protocols',
          translations: { 'zh-cn': '网络协议' },
          items: [{ autogenerate: { directory: 'protocols' } }],
        },
        {
          label: 'Agent Infrastructure',
          translations: { 'zh-cn': 'Agent 基础设施' },
          items: [{ autogenerate: { directory: 'agents' } }],
        },
        {
          label: 'Projects',
          translations: { 'zh-cn': '项目' },
          items: [{ autogenerate: { directory: 'projects' } }],
        },
      ],
    }),
  ],
});
