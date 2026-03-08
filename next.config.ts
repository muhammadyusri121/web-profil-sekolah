import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // VPS server — gambar guru & data sekolah
      {
        protocol: "http",
        hostname: "202.52.147.214",
        port: "5433",
      },
      {
        protocol: "http",
        hostname: "202.52.147.214",
        port: "",
      },
      {
        protocol: "https",
        hostname: "202.52.147.214",
        port: "",
      },
      // Wildcard untuk semua hostname (fallback dev)
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
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
      {
        source: '/kelulusan',
        destination: '/components/layanan/kelulusan',
      },
    ];
  },
};
export default nextConfig;
