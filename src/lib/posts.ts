import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../config/i18n';
import { defaultLocale, getLocaleConfig } from '../config/i18n';

export type Post = CollectionEntry<'posts'>;

export function getPostLocale(post: Post): Locale {
  if (post.id.startsWith('zh-cn/')) return 'zh-cn';
  if (post.id.startsWith('en/')) return 'en';
  return defaultLocale;
}

export function getPostSlug(post: Post) {
  return post.id
    .replace(/^(en|zh-cn)\//, '')
    .replace(/(?:\/index)?\.(md|mdx)$/i, '')
    .replace(/\.(md|mdx)$/i, '');
}

export function getPostHref(post: Post) {
  const locale = getPostLocale(post);
  const config = getLocaleConfig(locale);
  return `${config.postsPath}${getPostSlug(post)}/`;
}

export function getTagHref(tag: string, locale: Locale = defaultLocale) {
  return `${getLocaleConfig(locale).tagsPath}${getTagSlug(tag)}/`;
}

export function getTagSlug(tag: string) {
  return encodeURIComponent(tag.trim().toLowerCase().replace(/\s+/g, '-'));
}

export function filterPostsByLocale(posts: Post[], locale: Locale) {
  return posts.filter((post) => getPostLocale(post) === locale);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date, locale: Locale = defaultLocale) {
  return new Intl.DateTimeFormat(getLocaleConfig(locale).lang, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function groupPostsByYear(posts: Post[]) {
  return posts.reduce<Record<string, Post[]>>((groups, post) => {
    const year = String(post.data.date.getFullYear());
    groups[year] ??= [];
    groups[year].push(post);
    return groups;
  }, {});
}

export function getTagIndex(posts: Post[]) {
  return posts.reduce<Map<string, Post[]>>((index, post) => {
    for (const tag of post.data.tags) {
      const key = tag.trim();
      if (!key) continue;
      index.set(key, [...(index.get(key) ?? []), post]);
    }
    return index;
  }, new Map());
}
