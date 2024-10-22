export default function handler(req, res) {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://mat-portfolio.vercel.app/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(robotsTxt);
}
