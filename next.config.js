/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/finances",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
