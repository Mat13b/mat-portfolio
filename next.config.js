/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['votredomaine.com'], // Ajustez selon vos besoins
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
