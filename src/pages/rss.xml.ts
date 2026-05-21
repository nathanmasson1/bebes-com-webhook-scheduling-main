import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { isPostPublic } from '../lib/postVisibility';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => isPostPublic(data));

  return rss({
    title: 'Ninho & Colo - Maternidade e bebes',
    description: 'Guias acolhedores sobre maternidade, gravidez, enxoval, cuidados com o bebe e rotina familiar.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${post.id}/`,
      })),
    customData: '<language>pt-br</language>',
  });
}
