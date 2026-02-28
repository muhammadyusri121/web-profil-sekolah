// src/lib/data/post-data.ts
import { query } from "@/lib/db";

export async function getLatestPosts() {
  try {
    const result = await query(
      `SELECT * FROM "Post" WHERE is_published = true ORDER BY "createdAt" DESC LIMIT 5`
    );
    const data = result.rows;
    console.log("Postingan berhasil ditarik:", data.length);
    return data;
  } catch (error) {
    console.error("Gagal mengambil postingan dari VPS:", error);
    return [];
  }
}