/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    removeConsole: false,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  reactStrictMode: false,
  rewrites(){
    return [
      {
        source: '/profile/:path*',
        destination: '/authorized/profile/:path*'
      },
      {
        source: '/accounts/:path*',
        destination: '/authorized/accounts/:path*'
      },
      {
        source: '/metrics',
        destination: '/api/metrics'
      }
    ]
  }
};

module.exports = nextConfig;
