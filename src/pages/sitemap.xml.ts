import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { path } from '../data/site';
export const GET: APIRoute = ({ site }) => {
  const routes = ['', 'privacy/', ...projects.map((p) => `work/${p.slug}/`)];
  const urls = site
    ? routes
        .map(
          (route) =>
            `<url><loc>${new URL(path(route), site).href.replace(/&/g, '&amp;')}</loc></url>`,
        )
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
