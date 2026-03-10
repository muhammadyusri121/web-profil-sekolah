import { query } from "@/lib/db";

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
export async function getLatestPosts() {
  try {
    const result = await query(`
      SELECT
        id,
        title,
        slug,
        category       AS category,
        NULL           AS ekskul_name,
        'post'         AS source,
        images[1]      AS raw_image,
        NULL           AS thumbnail_raw,
        "createdAt"
      FROM "Post"
      WHERE is_published = true

      UNION ALL

      SELECT
        id,
        title,
        slug,
        NULL           AS category,
        ekskul_name    AS ekskul_name,
        'ekskul'       AS source,
        NULL           AS raw_image,
        thumbnail      AS thumbnail_raw,
        "createdAt"
      FROM "Extracurricular"
      WHERE is_published = true

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
      thumbnail: resolveImage(row.raw_image ?? row.thumbnail_raw),
      createdAt: row.createdat ?? row.createdAt,
    }));
  } catch (error) {
    console.error("Gagal mengambil postingan:", error);
    return [];
  }
}

/**
 * Mengambil SEMUA postingan dari dua sumber untuk halaman Arsip Berita
 */
export async function getAllPosts() {
  try {
    const result = await query(`
      SELECT
        id,
        title,
        slug,
        category       AS category,
        NULL           AS ekskul_name,
        'post'         AS source,
        images[1]      AS raw_image,
        NULL           AS thumbnail_raw,
        "createdAt"
      FROM "Post"
      WHERE is_published = true

      UNION ALL

      SELECT
        id,
        title,
        slug,
        NULL           AS category,
        ekskul_name    AS ekskul_name,
        'ekskul'       AS source,
        NULL           AS raw_image,
        thumbnail      AS thumbnail_raw,
        "createdAt"
      FROM "Extracurricular"
      WHERE is_published = true

      ORDER BY "createdAt" DESC
    `);

    return result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category ?? null,
      ekskul_name: row.ekskul_name ?? null,
      source: row.source,
      thumbnail: resolveImage(row.raw_image ?? row.thumbnail_raw),
      createdAt: row.createdat ?? row.createdAt,
    }));
  } catch (error) {
    console.error("Gagal mengambil semua postingan:", error);
    return [];
  }
}