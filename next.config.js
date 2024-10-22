/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['votredomaine.com'], // Ajustez selon vos besoins
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
    ];
  },
}

module.exports = nextConfig
