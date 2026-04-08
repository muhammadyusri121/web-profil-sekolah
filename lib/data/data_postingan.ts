import { query } from "@/lib/db";
import { type PostItem } from "./post-utils";

const VPS_BASE = "http://202.52.147.214:9000/datasmanka";

/** Normalkan path gambar ke Proxy Backend kita */
function resolveImage(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  
  // Bersihkan path (hilangkan /api/files/ jika sudah ada atau /datasmanka/)
  const clean = raw
    .replace(/^\/?api\/files\//, "")
    .replace(/^\/?datasmanka\//, "")
    .replace(/^\//, "");
    
  return `/api/files/${clean}`;
}

/**
 * Mengambil 10 postingan terbaru dari dua sumber:
 * - Tabel Post (karya, osis, humas, double-track, dll)
 * - Tabel Extracurricular (artikel per ekskul)
 * Hasil digabung, diurutkan by createdAt DESC, dan diambil 10 teratas.
 */
export async function getLatestPosts(): Promise<PostItem[]> {
  try {
    const result = await query(`
      SELECT
        p.id, p.title, p.slug, p.category, 
        NULL AS ekskul_name, 
        'post' AS source, 
        p.images[1] AS raw_image, 
        p."createdAt",
        u.name AS author_name
      FROM "Post" p
      LEFT JOIN "User" u ON p."authorId" = u.id
      WHERE p.is_published = true

      UNION ALL

      SELECT
        e.id, e.title, e.slug, NULL AS category, 
        e.ekskul_name, 
        'ekskul' AS source, 
        e.thumbnail AS raw_image, 
        e."createdAt",
        u.name AS author_name
      FROM "Extracurricular" e
      LEFT JOIN "User" u ON e."authorId" = u.id
      WHERE e.is_published = true

      ORDER BY "createdAt" DESC
      LIMIT 10
    `);

    return result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category ?? null,
      ekskul_name: row.ekskul_name ?? null,
      source: row.source,
      thumbnail: resolveImage(row.raw_image),
      createdAt: row.createdat ?? row.createdAt,
      authorName: row.author_name ?? null,
    }));
  } catch (error) {
    console.error("Gagal mengambil postingan:", error);
    return [];
  }
}

/**
 * Mengambil SEMUA postingan dari dua sumber untuk halaman Arsip Berita
 */
export async function getAllPosts(): Promise<PostItem[]> {
  try {
    const result = await query(`
      SELECT
        p.id, p.title, p.slug, p.category, 
        NULL AS ekskul_name, 
        'post' AS source, 
        p.images[1] AS raw_image, 
        p."createdAt",
        u.name AS author_name
      FROM "Post" p
      LEFT JOIN "User" u ON p."authorId" = u.id
      WHERE p.is_published = true

      UNION ALL

      SELECT
        e.id, e.title, e.slug, NULL AS category, 
        e.ekskul_name, 
        'ekskul' AS source, 
        e.thumbnail AS raw_image, 
        e."createdAt",
        u.name AS author_name
      FROM "Extracurricular" e
      LEFT JOIN "User" u ON e."authorId" = u.id
      WHERE e.is_published = true

      ORDER BY "createdAt" DESC
    `);

    return result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category ?? null,
      ekskul_name: row.ekskul_name ?? null,
      source: row.source,
      thumbnail: resolveImage(row.raw_image),
      createdAt: row.createdat ?? row.createdAt,
      authorName: row.author_name ?? null,
    }));
  } catch (error) {
    console.error("Gagal mengambil semua postingan:", error);
    return [];
  }
}