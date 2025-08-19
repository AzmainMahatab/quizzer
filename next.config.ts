import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure React 19 features are enabled in Next 15
  },
  images: {
    // configure if remote images used later
  },
};

export default nextConfig;
