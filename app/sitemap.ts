import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/data/data_postingan";
import { getPostHref } from "@/lib/data/post-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sman1ketapang.sch.id";

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/profil/sambutan",
    "/profil/mars",
    "/profil/visi-misi",
    "/profil/struktur-gtk",
    "/akademik/kalender-akademik",
    "/akademik/jadwal-sekolah",
    "/akademik/perangkat-pembelajaran",
    "/akademik/karya",
    "/asesmen/asas",
    "/asesmen/asaj",
    "/asesmen/tka",
    "/asesmen/supervisi",
    "/kesiswaan/osis",
    "/kesiswaan/ekstrakurikuler",
    "/kesiswaan/double-track",
    "/informasi/humas",
    "/informasi/komite",
    "/informasi/kemitraan",
    "/informasi/prestasi",
    "/informasi/kegiatan",
    "/fasilitas",
    "/layanan",
    "/beranda/post/berita",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Routes (Articles)
  const posts = await getAllPosts();
  const dynamicRoutes = posts.map((post) => ({
    url: `${baseUrl}${getPostHref(post)}`,
    lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
