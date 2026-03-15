import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    const path = 'homepage';
    // Generate simple ID (karena raw SQL tidak otomatis menjalankan @default(cuid))
    const id = `stat_${Math.random().toString(36).substring(2, 11)}`;

    await query(
      `INSERT INTO "VisitorStatistic" (id, path, count, "updatedAt")
       VALUES ($1, $2, 1, NOW())
       ON CONFLICT (path)
       DO UPDATE SET count = "VisitorStatistic".count + 1, "updatedAt" = NOW()`,
      [id, path]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await query('SELECT count FROM "VisitorStatistic" WHERE path = $1', ['homepage']);
    return NextResponse.json(result.rows[0] || { count: 0 });
  } catch (error: any) {
    return NextResponse.json({ count: 0 });
  }
}