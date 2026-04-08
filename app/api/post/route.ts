import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('category');
    const slug = searchParams.get('slug');

    let result;
    if (slug) {
      result = await query(`
        SELECT p.*, u.name AS author_name 
        FROM "Post" p 
        LEFT JOIN "User" u ON p."authorId" = u.id 
        WHERE p.slug = $1 AND p.is_published = true
      `, [slug]);
    } else if (kategori) {
      const categories = kategori.split(',');
      const placeholders = categories.map((_, i) => `$${i + 1}`).join(',');
      result = await query(`
        SELECT p.*, u.name AS author_name 
        FROM "Post" p 
        LEFT JOIN "User" u ON p."authorId" = u.id 
        WHERE p.category IN (${placeholders}) AND p.is_published = true 
        ORDER BY p."createdAt" DESC
      `, categories);
    } else {
      result = await query(`
        SELECT p.*, u.name AS author_name 
        FROM "Post" p 
        LEFT JOIN "User" u ON p."authorId" = u.id 
        WHERE p.is_published = true 
        ORDER BY p."createdAt" DESC
      `);
    }

    const transform = (item: any) => {
      if (!item) return null;

      let imgArray = Array.isArray(item.images) ? item.images : [];
      item.images = imgArray.map((img: string) => {
        if (typeof img === 'string' && !img.startsWith('http')) {
          const clean = img.startsWith('/') ? img : `/${img}`;
          return `/api/files${clean.replace(/^\/datasmanka\//, '/')}`;
        }
        return img;
      });

      item.thumbnail = item.images.length > 0 ? item.images[0] : null;

      if (item.content) {
        const minioRegex = /http:\/\/202\.52\.147\.214:9000\/datasmanka\//g;
        item.content = item.content.replace(minioRegex, '/api/files/');
        item.content = item.content.replace(/src="\/uploads\//g, 'src="/api/files/uploads/');
      }

      return item;
    };

    const data = slug ? transform(result.rows[0]) : result.rows.map(transform);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("DB_ERROR:", error.message);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}