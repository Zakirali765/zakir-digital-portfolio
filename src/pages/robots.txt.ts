import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const body = site
    ? `User-agent: *\nAllow: ${base}\nDisallow: ${base}demos/\nSitemap: ${new URL(`${base.replace(/\/$/, '')}/sitemap.xml`, site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
