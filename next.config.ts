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
};
export default nextConfig;
