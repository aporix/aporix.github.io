import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function getPostSlug(post: Post) {
  return post.id.replace(/(?:\/index)?\.(md|mdx)$/i, '').replace(/\.(md|mdx)$/i, '');
}

export function getPostHref(post: Post) {
  return `/posts/${getPostSlug(post)}/`;
}

export function getTagSlug(tag: string) {
  return encodeURIComponent(tag.trim().toLowerCase().replace(/\s+/g, '-'));
}

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
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
