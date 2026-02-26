// src/lib/data/post-data.ts
import { prisma } from "@/lib/prisma";

export async function getLatestPosts() {
  try {
    const data = await prisma.post.findMany({
      where: {
        is_published: true, // Hanya ambil yang true
      },
      orderBy: {
        createdAt: "desc", // Urutkan dari yang terbaru
      },
      take: 5, // Ambil 3 postingan terbaru saja untuk beranda
    });
    console.log("Postingan berhasil ditarik:", data.length);
    return data;
  } catch (error) {
    console.error("Gagal mengambil postingan dari VPS:", error);
    return [];
  }
}