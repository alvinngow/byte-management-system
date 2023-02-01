/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.graphql$/i,
      type: 'asset/source',
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: `/${process.env.AWS_S3_BUCKET}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
