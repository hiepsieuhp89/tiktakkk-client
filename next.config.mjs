/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /flag-icons.*\.css$/,
      type: "asset/resource",
    });
    return config;
  },
  experimental: {
    outputFileTracingRoot: process.cwd(),
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**/*',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'my-live-01.slatic.net',
      },
      {
        protocol: 'https',
        hostname: 'img6.yeshen.cc',
      },
      {
        protocol: 'https',
        hostname: 'img.yeshen.cc',
      },
      {
        protocol: 'https',
        hostname: 'shop.shop-worldwide-amz.top',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    const domain =
      process.env.NEXT_PUBLIC_API_URL || "amz.dunghaysai.site";
    return [
      {
        source: "/api/:path*",
        destination: `https://${domain}/:path*`,
      },
    ];
  },
};

export default nextConfig;
