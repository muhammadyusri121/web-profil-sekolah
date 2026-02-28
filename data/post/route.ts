import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Sesuaikan dengan setup database kamu

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  try {
    // 1. Ambil Detail per Slug (Jika ada slug di URL)
    if (slug) {
      const result = await query('SELECT * FROM "Post" WHERE slug = $1 AND is_published = true', [slug]);
      const data = result.rows[0];
      if (data) {
        let thumbnail = data.thumbnail;
        if (!thumbnail && Array.isArray(data.images) && data.images.length > 0) {
          thumbnail = data.images[0];
        }
        if (thumbnail && !thumbnail.startsWith('http')) {
          const rawPath = thumbnail.replace('/api/files/', '');
          data.thumbnail = `http://202.52.147.214:9000/datasmanka/${rawPath}`;
        }
      }
      return NextResponse.json(data || null);
    }

    // 2. Ambil List per Kategori (Misal: Inovasi)
    if (category) {
      const result = await query('SELECT * FROM "Post" WHERE category = $1 AND is_published = true ORDER BY id DESC', [category]);
      const data = result.rows.map(row => {
        let thumbnail = row.thumbnail;
        if (!thumbnail && Array.isArray(row.images) && row.images.length > 0) {
          thumbnail = row.images[0];
        }
        if (thumbnail && !thumbnail.startsWith('http')) {
          const rawPath = thumbnail.replace('/api/files/', '');
          row.thumbnail = `http://202.52.147.214:9000/datasmanka/${rawPath}`;
        }
        return row;
      });
      return NextResponse.json(data);
    }

    return NextResponse.json({ message: "Gunakan query category atau slug" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}