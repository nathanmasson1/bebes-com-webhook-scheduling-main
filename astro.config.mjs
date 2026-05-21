import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

function getConfiguredSiteUrl() {
  try {
    const config = JSON.parse(readFileSync(new URL('./src/data/siteConfig.json', import.meta.url), 'utf-8'));
    return (config.url || 'https://maedacabecaaospes.com.br').replace(/\/$/, '');
  } catch {
    return 'https://maedacabecaaospes.com.br';
  }
}

export default defineConfig({
  site: getConfiguredSiteUrl(),
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['marked'],
    },
  },
});
