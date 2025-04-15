/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable any dynamic features for static export
  experimental: {
    // Remove appDir as it's now default
  },
};

module.exports = nextConfig;
