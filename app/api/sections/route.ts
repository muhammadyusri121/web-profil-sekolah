import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const res = await query('SELECT * FROM "SectionHeader" WHERE slug = $1', [slug]);
    
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    console.error("SECTION_API_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
