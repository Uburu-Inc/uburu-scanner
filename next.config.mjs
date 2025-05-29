import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add alias for @ to point to ./src
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  }
};

export default nextConfig;

