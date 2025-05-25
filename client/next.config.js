/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "erp.samironbarai.xyz", // ✅ Add this domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "erp.samironbarai.xyz", // ✅ Explicitly added
      },
      {
        protocol: "https",
        hostname: "premium.samironbarai.xyz", // ✅ Explicitly added
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ✅ Explicitly added
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ Explicitly added
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // ✅ Explicitly added
      },
    ],
  },
};

module.exports = nextConfig;
