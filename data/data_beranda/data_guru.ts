import { query } from "@/lib/db";

// File gambar disimpan di MinIO (object storage) di VPS
// URL pattern: http://202.52.147.214:9000/datasmanka/{folder}/{filename}
// Sedangkan di database tersimpan sebagai: /api/files/{folder}/{filename}
// Jadi kita perlu strip "/api/files/" dan replace dengan URL MinIO yang benar
const MINIO_BASE = "http://202.52.147.214:9000/datasmanka";

function resolveImageUrl(url: string | null): string | null {
  if (!url) return null;
  // Jika sudah URL absolut (dari sumber lain), kembalikan langsung
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Konversi path relatif /api/files/personnel/xxx.png
  // → http://202.52.147.214:9000/datasmanka/personnel/xxx.png
  const withoutApiFiles = url.replace(/^\/?api\/files\//, "");
  return `${MINIO_BASE}/${withoutApiFiles}`;
}

export async function getStructuralPersonnel() {
  try {
    const result = await query(
      `SELECT * FROM "EducationPersonnel" ORDER BY sort_order ASC`
    );

    const data = result.rows.map((person: any) => ({
      ...person,
      image_url: resolveImageUrl(person.image_url),
    }));

    console.log("Data Pendidik:", data.length, "— Contoh image_url:", data[0]?.image_url);
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dari VPS:", error);
    return [];
  }
}