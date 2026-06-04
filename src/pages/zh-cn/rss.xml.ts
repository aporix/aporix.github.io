import { getCollection } from 'astro:content';
import { getLocaleConfig } from '../../config/i18n';
import { filterPostsByLocale, getPostHref, sortPosts } from '../../lib/posts';

const site = 'https://aporix.github.io';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const locale = 'zh-cn';
  const config = getLocaleConfig(locale);
  const posts = sortPosts(filterPostsByLocale(await getCollection('posts', ({ data }) => !data.draft), locale));
  const items = posts
    .map((post) => {
      const href = new URL(getPostHref(post), site).toString();

      return `
        <item>
          <title>${escapeXml(post.data.title)}</title>
          <link>${href}</link>
          <guid>${href}</guid>
          <pubDate>${post.data.date.toUTCString()}</pubDate>
          <description>${escapeXml(post.data.description)}</description>
        </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(config.title)}</title>
        <link>${site}${config.homePath}</link>
        <description>${escapeXml(config.rssDescription)}</description>
        <language>${config.lang}</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
