export const locales = {
  en: {
    label: 'English',
    lang: 'en',
    base: '',
    postsPath: '/posts/',
    archivePath: '/archive/',
    tagsPath: '/tags/',
    rssPath: '/rss.xml',
    homePath: '/',
    title: 'Aporix',
    notesTitle: 'Aporix Notes',
    postsKicker: 'Notes',
    postsHeading: 'Recent writing',
    postsDescription: 'Short notes and longer essays, ordered by publication date.',
    archiveTitle: 'Archive',
    archiveHeading: 'All posts',
    archiveDescription: 'A chronological index for older notes and essays.',
    tagsTitle: 'Tags',
    tagsHeading: 'Topics',
    tagsDescription: 'A lightweight index for recurring themes.',
    nav: {
      posts: 'Posts',
      archive: 'Archive',
      tags: 'Tags',
      rss: 'RSS',
      github: 'GitHub',
      switchLocale: '中文',
    },
    rssDescription: 'Engineering notes from Aporix.',
    postCount: (count: number) => `${count} post${count === 1 ? '' : 's'} in this topic.`,
    older: 'Older',
    newer: 'Newer',
  },
  'zh-cn': {
    label: '简体中文',
    lang: 'zh-CN',
    base: '/zh-cn',
    postsPath: '/zh-cn/posts/',
    archivePath: '/zh-cn/archive/',
    tagsPath: '/zh-cn/tags/',
    rssPath: '/zh-cn/rss.xml',
    homePath: '/zh-cn/',
    title: 'Aporix 中文',
    notesTitle: 'Aporix 中文笔记',
    postsKicker: '文章',
    postsHeading: '近期写作',
    postsDescription: '按发布时间倒序排列的技术文章、笔记和阶段性记录。',
    archiveTitle: '归档',
    archiveHeading: '全部文章',
    archiveDescription: '按年份整理的历史文章索引。',
    tagsTitle: '标签',
    tagsHeading: '主题',
    tagsDescription: '用于浏览长期主题的轻量索引。',
    nav: {
      posts: '文章',
      archive: '归档',
      tags: '标签',
      rss: 'RSS',
      github: 'GitHub',
      switchLocale: 'English',
    },
    rssDescription: 'Aporix 的工程技术笔记。',
    postCount: (count: number) => `${count} 篇文章属于这个主题。`,
    older: '更早',
    newer: '更新',
  },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';
export const localeKeys = Object.keys(locales) as Locale[];

export function getLocaleConfig(locale: Locale) {
  return locales[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'zh-cn' ? 'en' : 'zh-cn';
}

export function getAlternateHref(locale: Locale) {
  return getLocaleConfig(getAlternateLocale(locale)).homePath;
}
