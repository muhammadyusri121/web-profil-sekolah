import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('category');
    const slug = searchParams.get('slug');

    let result;
    if (slug && kategori) {
      result = await query('SELECT * FROM "Post" WHERE slug = $1 AND category = $2 AND is_published = true', [slug, kategori]);
    } else if (slug) {
      result = await query('SELECT * FROM "Post" WHERE slug = $1 AND is_published = true', [slug]);
    } else if (kategori) {
      result = await query('SELECT * FROM "Post" WHERE category = $1 AND is_published = true', [kategori]);
    } else {
      result = await query('SELECT * FROM "Post" WHERE is_published = true');
    }

    let data = slug ? (result.rows[0] || null) : result.rows;

    if (data) {
      const transform = (item: any) => {
        if (!item) return item;

        // 1. Transformasi Thumbnail & Images Array
        const imageFields = ['thumbnail', 'image', 'thumbnail_raw', 'image_url'];
        imageFields.forEach(field => {
          if (item[field] && typeof item[field] === 'string' && !item[field].startsWith('http')) {
            const cleanPath = item[field].startsWith('/') ? item[field] : `/${item[field]}`;

            // Jika SUDAH punya /api/files, jangan tambah lagi
            if (cleanPath.startsWith('/api/files/')) {
               item[field] = cleanPath;
               return;
            }

            // Hapus prefix datasmanka jika ada
            const finalPath = cleanPath.replace(/^\/datasmanka\//, '/');
            item[field] = `/api/files${finalPath}`;
          }
        });

        // Loop untuk array images jika ada
        if (Array.isArray(item.images)) {
          item.images = item.images.map((img: string) => {
             if (typeof img === 'string' && !img.startsWith('http')) {
                const clean = img.startsWith('/') ? img : `/${img}`;
                return `/api/files${clean.replace(/^\/datasmanka\//, '/')}`;
             }
             return img;
          });
          // Fallback thumbnail dari images[0] jika thumbnail kosong
          if (!item.thumbnail && item.images.length > 0) {
            item.thumbnail = item.images[0];
          }
        }

        // 2. Transformasi di dalam Content (HTML)
        // Ganti URL MinIO langsung (IP) menjadi Proxy kita
        if (item.content && typeof item.content === 'string') {
          // Ganti http://202.52.147.214:9000/datasmanka/... menjadi /api/files/...
          const minioRegex = /http:\/\/202\.52\.147\.214:9000\/datasmanka\//g;
          item.content = item.content.replace(minioRegex, '/api/files/');
          
          // Ganti rujukan relatif /uploads/... menjadi /api/files/uploads/...
          // Ini biasanya untuk gambar yang diinsert via editor
          const relativeUploadsRegex = /src="\/uploads\//g;
          item.content = item.content.replace(relativeUploadsRegex, 'src="/api/files/uploads/');
        }

        return item;
      };

      data = Array.isArray(data) ? data.map(transform) : transform(data);
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