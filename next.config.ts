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
      // Ekstrakurikuler - Pramuka
      {
        source: '/ekskul/pramuka',
        destination: '/components/kesiswaan/ekstrakurikuler/Pramuka',
      },
      {
        source: '/ekskul/pramuka/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Pramuka/:slug*',
      },
      // Ekstrakurikuler - Paskibraka
      {
        source: '/ekskul/paskibraka',
        destination: '/components/kesiswaan/ekstrakurikuler/Paskibraka',
      },
      {
        source: '/ekskul/paskibraka/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Paskibraka/:slug*',
      },
      // Ekstrakurikuler - Sains Club
      {
        source: '/ekskul/sains-club',
        destination: '/components/kesiswaan/ekstrakurikuler/Sains_Club',
      },
      {
        source: '/ekskul/sains-club/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Sains_Club/:slug*',
      },
      // Ekstrakurikuler - Basket
      {
        source: '/ekskul/basket',
        destination: '/components/kesiswaan/ekstrakurikuler/Basket',
      },
      {
        source: '/ekskul/basket/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Basket/:slug*',
      },
      // Ekstrakurikuler - Voli
      {
        source: '/ekskul/voli',
        destination: '/components/kesiswaan/ekstrakurikuler/Voli',
      },
      {
        source: '/ekskul/voli/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Voli/:slug*',
      },
      // Ekstrakurikuler - Seni Tari
      {
        source: '/ekskul/seni-tari',
        destination: '/components/kesiswaan/ekstrakurikuler/Seni_Tari',
      },
      {
        source: '/ekskul/seni-tari/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Seni_Tari/:slug*',
      },
      // Ekstrakurikuler - Paduan Suara
      {
        source: '/ekskul/paduan-suara',
        destination: '/components/kesiswaan/ekstrakurikuler/Paduan_Suara',
      },
      {
        source: '/ekskul/paduan-suara/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Paduan_Suara/:slug*',
      },
      // Ekstrakurikuler - PMR
      {
        source: '/ekskul/pmr',
        destination: '/components/kesiswaan/ekstrakurikuler/PMR',
      },
      {
        source: '/ekskul/pmr/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/PMR/:slug*',
      },
      // Ekstrakurikuler - Jurnalistik
      {
        source: '/ekskul/jurnalistik',
        destination: '/components/kesiswaan/ekstrakurikuler/Jurnalistik',
      },
      {
        source: '/ekskul/jurnalistik/:slug*',
        destination: '/components/kesiswaan/ekstrakurikuler/Jurnalistik/:slug*',
      },
    ];
  },
};
export default nextConfig;
