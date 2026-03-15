import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM "Facility" ORDER BY name ASC');
    
    const facilities = result.rows.map((item: any) => {
      if (item.image_url && typeof item.image_url === 'string' && !item.image_url.startsWith('http')) {
        const clean = item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`;
        item.image_url = `/api/files${clean.replace(/^\/datasmanka\//, '/')}`;
      }
      return item;
    });

    return NextResponse.json(facilities);
  } catch (error: any) {
    console.error("DB_ERROR_FACILITY:", error.message);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}
