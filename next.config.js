/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
