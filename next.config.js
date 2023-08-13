/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: { domains: ["img.btolat.com"] },
};

module.exports = nextConfig;
