import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Jika Anda menyimpan gambar di VPS dengan domain sendiri, tambahkan juga di sini:
      // {
      //   protocol: "https",
      //   hostname: "nama-domain-vps-anda.com",
      // },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/karya',
        destination: '/components/akademik/karya',
      },
      {
        source: '/karya/:slug*',
        destination: '/components/akademik/karya/:slug*',
      },
      {
        source: '/double-track',
        destination: '/components/kesiswaan/double-track',
      },
      {
        source: '/double-track/:slug*',
        destination: '/components/kesiswaan/double-track/:slug*',
      },
      {
        source: '/humas-komite',
        destination: '/components/informasi/humas-komite',
      },
      {
        source: '/humas-komite/:slug*',
        destination: '/components/informasi/humas-komite/:slug*',
      },
      {
        source: '/osis',
        destination: '/components/kesiswaan/osis',
      },
      {
        source: '/osis/:slug*',
        destination: '/components/kesiswaan/osis/:slug*',
      },
    ];
  },
};
export default nextConfig;
