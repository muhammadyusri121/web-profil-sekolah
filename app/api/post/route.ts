import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('category');
    const slug = searchParams.get('slug');

    let result;
    if (slug) {
      result = await query('SELECT * FROM "Post" WHERE slug = $1 AND is_published = true', [slug]);
    } else if (kategori) {
      result = await query('SELECT * FROM "Post" WHERE category = $1 AND is_published = true', [kategori]);
    } else {
      result = await query('SELECT * FROM "Post" WHERE is_published = true');
    }

    let data = slug ? (result.rows[0] || null) : result.rows;

    if (data) {
      const transformThumbnail = (item: any) => {
        let thumbnail = item.thumbnail;

        // Coba baca dari array images jika thumbnail kosong
        if (!thumbnail && Array.isArray(item.images) && item.images.length > 0) {
          thumbnail = item.images[0];
        }

        if (thumbnail && !thumbnail.startsWith('http')) {
          const rawPath = thumbnail.replace('/api/files/', '');
          thumbnail = `http://202.52.147.214:9000/datasmanka/${rawPath}`;
        }
        item.thumbnail = thumbnail;
        return item;
      };

      if (Array.isArray(data)) {
        data = data.map(transformThumbnail);
      } else {
        data = transformThumbnail(data);
      }
    }

    return NextResponse.json(data);

  } catch (error: any) {
    // INI PENTING: Cek terminal VS Code kamu, lihat tulisan merahnya!
    console.error("=== ERROR DATABASE ===");
    console.error(error.message);

    return NextResponse.json(
      { error: "Gagal konek DB", detail: error.message },
      { status: 500 }
    );
  }
}