import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Membatasi penggunaan CPU agar VPS tidak beku saat build
    cpus: 1,
    workerThreads: false,
  },
  typescript: {
    // TypeScript dicek saat dev, skip saat build untuk hemat RAM di VPS
    ignoreBuildErrors: true,
  },
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
        destination: '/akademik/karya',
      },
      {
        source: '/karya/:slug*',
        destination: '/akademik/karya/:slug*',
      },
      {
        source: '/double-track',
        destination: '/kesiswaan/double-track',
      },
      {
        source: '/double-track/:slug*',
        destination: '/kesiswaan/double-track/:slug*',
      },
      {
        source: '/humas',
        destination: '/informasi/humas',
      },
      {
        source: '/humas/:slug*',
        destination: '/informasi/humas/:slug*',
      },
      {
        source: '/komite',
        destination: '/informasi/komite',
      },
      {
        source: '/komite/:slug*',
        destination: '/informasi/komite/:slug*',
      },
      {
        source: '/supervisi',
        destination: '/asesmen/supervisi',
      },
      {
        source: '/supervisi/:slug*',
        destination: '/asesmen/supervisi/:slug*',
      },
      {
        source: '/asas',
        destination: '/asesmen/asas',
      },
      {
        source: '/asas/:slug*',
        destination: '/asesmen/asas/:slug*',
      },
      {
        source: '/asaj',
        destination: '/asesmen/asaj',
      },
      {
        source: '/asaj/:slug*',
        destination: '/asesmen/asaj/:slug*',
      },
      {
        source: '/tka',
        destination: '/asesmen/tka',
      },
      {
        source: '/tka/:slug*',
        destination: '/asesmen/tka/:slug*',
      },
      {
        source: '/kemitraan',
        destination: '/informasi/kemitraan',
      },
      {
        source: '/kemitraan/:slug*',
        destination: '/informasi/kemitraan/:slug*',
      },
      {
        source: '/osis',
        destination: '/kesiswaan/osis',
      },
      {
        source: '/osis/:slug*',
        destination: '/kesiswaan/osis/:slug*',
      },
      {
        source: '/kelulusan',
        destination: '/layanan/kelulusan',
      },
      // Ekstrakurikuler - Pramuka
      {
        source: '/ekskul/pramuka',
        destination: '/kesiswaan/ekstrakurikuler/Pramuka',
      },
      {
        source: '/ekskul/pramuka/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Pramuka/:slug*',
      },
      // Ekstrakurikuler - Paskibraka
      {
        source: '/ekskul/paskibraka',
        destination: '/kesiswaan/ekstrakurikuler/Paskibraka',
      },
      {
        source: '/ekskul/paskibraka/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Paskibraka/:slug*',
      },
      // Ekstrakurikuler - Sains Club
      {
        source: '/ekskul/sains-club',
        destination: '/kesiswaan/ekstrakurikuler/Sains_Club',
      },
      {
        source: '/ekskul/sains-club/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Sains_Club/:slug*',
      },
      // Ekstrakurikuler - Basket
      {
        source: '/ekskul/basket',
        destination: '/kesiswaan/ekstrakurikuler/Basket',
      },
      {
        source: '/ekskul/basket/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Basket/:slug*',
      },
      // Ekstrakurikuler - Voli
      {
        source: '/ekskul/voli',
        destination: '/kesiswaan/ekstrakurikuler/Voli',
      },
      {
        source: '/ekskul/voli/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Voli/:slug*',
      },
      // Ekstrakurikuler - Seni Tari
      {
        source: '/ekskul/seni-tari',
        destination: '/kesiswaan/ekstrakurikuler/Seni_Tari',
      },
      {
        source: '/ekskul/seni-tari/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Seni_Tari/:slug*',
      },
      // Ekstrakurikuler - Paduan Suara
      {
        source: '/ekskul/paduan-suara',
        destination: '/kesiswaan/ekstrakurikuler/Paduan_Suara',
      },
      {
        source: '/ekskul/paduan-suara/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Paduan_Suara/:slug*',
      },
      // Ekstrakurikuler - PMR
      {
        source: '/ekskul/pmr',
        destination: '/kesiswaan/ekstrakurikuler/PMR',
      },
      {
        source: '/ekskul/pmr/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/PMR/:slug*',
      },
      // Ekstrakurikuler - Jurnalistik
      {
        source: '/ekskul/jurnalistik',
        destination: '/kesiswaan/ekstrakurikuler/Jurnalistik',
      },
      {
        source: '/ekskul/jurnalistik/:slug*',
        destination: '/kesiswaan/ekstrakurikuler/Jurnalistik/:slug*',
      },
      // Kegiatan Sekolah
      {
        source: '/kegiatan',
        destination: '/informasi/kegiatan',
      },
      {
        source: '/kegiatan/:slug*',
        destination: '/informasi/kegiatan/:slug*',
      },
      // Galeri Prestasi
      {
        source: '/prestasi',
        destination: '/informasi/prestasi',
      },
      {
        source: '/prestasi/:slug*',
        destination: '/informasi/prestasi/:slug*',
      },
    ];
  },
};
export default nextConfig;
