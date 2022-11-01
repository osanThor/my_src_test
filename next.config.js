/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quantro-app.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/app/**',
      },
    ],
  },
};

module.exports = nextConfig;
