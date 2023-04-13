let endpointURL;

try {
  endpointURL = new URL(process.env.AWS_S3_ENDPOINT);
} catch {
  endpointURL = new URL('http://localhost:9000');
}

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
  output: process.env.NEXT_BUILD_OUTPUT,
};

module.exports = nextConfig;
