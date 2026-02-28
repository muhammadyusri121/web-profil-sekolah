import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resource: string }> } // 1. Ubah jadi Promise
) {
  // 2. Unwrapping params (Wajib untuk Next.js versi terbaru)
  const { resource: rawResource } = await params;
  const resource = rawResource.toLowerCase(); // Normalisasi biar gak sensitif huruf besar/kecil

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');

  try {
    let result;
    let data;

    switch (resource) {
      case 'post': // Sekarang /api/Post atau /api/post bakal lari ke sini
        if (slug) {
          result = await query('SELECT * FROM "Post" WHERE slug = $1 AND is_published = true', [slug]);
          data = result.rows[0] || null;
        } else if (category) {
          result = await query('SELECT * FROM "Post" WHERE category = $1 AND is_published = true', [category]);
          data = result.rows;
        } else {
          result = await query('SELECT * FROM "Post" WHERE is_published = true');
          data = result.rows;
        }
        break;

      case 'facility':
        if (id) {
          result = await query('SELECT * FROM "Facility" WHERE id = $1', [id]);
          data = result.rows[0] || null;
        } else {
          result = await query('SELECT * FROM "Facility"');
          data = result.rows;
        }
        break;

      case 'graduation':
        const nisn = searchParams.get('nisn');
        if (nisn) {
          result = await query('SELECT * FROM "Graduation" WHERE nisn = $1', [nisn]);
          if (result.rows.length === 0) {
            return NextResponse.json({}, { status: 200 }); // JSON kosong, bukan error 500
          }
          data = result.rows[0];
        } else {
          result = await query('SELECT * FROM "Graduation"');
          data = result.rows;
        }
        break;

      default:
        // Jika resource tidak ada di switch, baru kirim 404
        return NextResponse.json({ error: `Resource '${resource}' tidak ditemukan` }, { status: 404 });
    }

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
    console.error("API Error:", error.message);
    return NextResponse.json({ error: "Server Error", detail: error.message }, { status: 500 });
  }
}