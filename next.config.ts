/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = {
  ...nextConfig,
  staticPageGenerationTimeout: 1000,
  output: "standalone",
};
