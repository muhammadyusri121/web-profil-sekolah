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
      case 'personnel': // Menangani resource guru
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

    // Transformasi URL Gambar untuk semua resource (personnel, post, facility)
    if (data) {
      const VPS_BASE = "http://202.52.147.214:5433";
      
      const transform = (item: any) => {
        // Cek field image_url (personnel) dan thumbnail (post)
        ['image_url', 'thumbnail'].forEach(field => {
          if (item[field] && !item[field].startsWith('http')) {
            const cleanPath = item[field].startsWith('/') ? item[field] : `/${item[field]}`;
            item[field] = `${VPS_BASE}${cleanPath}`;
          }
        });
        return item;
      };

      data = Array.isArray(data) ? data.map(transform) : transform(data);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Server Error", detail: error.message }, { status: 500 });
  }
}