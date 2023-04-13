const endpointURL = new URL(process.env.AWS_S3_ENDPOINT);

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
        protocol: endpointURL.protocol.slice(0, -1),
        hostname: endpointURL.hostname,
        port: endpointURL.port,
        pathname: `/${process.env.AWS_S3_BUCKET}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
