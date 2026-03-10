import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resource: string }> } // Unwrapping params sesuai Next.js 15+
) {
  const { resource: rawResource } = await params;
  const resource = rawResource.toLowerCase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  try {
    let data;

    switch (resource) {
      case 'personnel':
        const personnelRes = await query('SELECT * FROM "EducationPersonnel" ORDER BY sort_order ASC');
        data = personnelRes.rows;
        break;

      case 'post':
        if (slug) {
          const postRes = await query('SELECT * FROM "Post" WHERE slug = $1 AND is_published = true', [slug]);
          data = postRes.rows[0] || null;
        } else {
          const postsRes = await query('SELECT * FROM "Post" WHERE is_published = true');
          data = postsRes.rows;
        }
        break;

      default:
        return NextResponse.json({ error: `Resource '${resource}' tidak ditemukan` }, { status: 404 });
    }

    if (data) {
      // Tentukan Base URL: Gunakan env var atau fallback ke IP CMS jika di lokal
      let apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      
      if (!apiBase || apiBase.includes("localhost")) {
        apiBase = "http://202.52.147.214:9000";
      }

      const transform = (item: any) => {
        if (!item) return item;
        
        // 1. Transformasi Field Gambar
        const imageFields = ['image_url', 'thumbnail', 'thumbnail_raw', 'image', 'raw_image'];
        imageFields.forEach(field => {
          if (item[field] && typeof item[field] === 'string') {
            if (item[field].startsWith('http')) return;
            
            // Bersihkan dan normalkan path
            let cleanPath = item[field].startsWith('/') ? item[field] : `/${item[field]}`;
            
            // Jika SUDAH punya /api/files, jangan tambah lagi
            if (cleanPath.startsWith('/api/files/')) {
               item[field] = cleanPath;
               return;
            }

            // Hapus prefix datasmanka jika ada agar tidak double
            const finalPath = cleanPath.replace(/^\/datasmanka\//, '/');
            item[field] = `/api/files${finalPath}`;
          }
        });
        // 2. Transformasi di dalam Content/Description (HTML)
        const contentFields = ['content', 'description'];
        contentFields.forEach(field => {
          if (item[field] && typeof item[field] === 'string') {
            const minioRegex = /http:\/\/202\.52\.147\.214:9000\/datasmanka\//g;
            item[field] = item[field].replace(minioRegex, '/api/files/');
            
            const relativeUploadsRegex = /src="\/uploads\//g;
            item[field] = item[field].replace(relativeUploadsRegex, 'src="/api/files/uploads/');
          }
        });

        return item;
      };

      data = Array.isArray(data) ? data.map(transform) : transform(data);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`[API ERROR] Gagal load ${resource}:`, error);
    return NextResponse.json({ 
      error: "Server Error", 
      detail: error.message || "Koneksi Database Gagal. Pastikan DATABASE_URL benar.",
      code: error.code
    }, { status: 500 });
  }
}