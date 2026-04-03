import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { path = 'homepage' } = await request.json();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    // Check if recorded today for this path using raw IP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await query(
      `SELECT id FROM "VisitorLog" 
       WHERE "ipHash" = $1 AND "path" = $2 AND "visitedAt" >= $3`,
      [ip, path, today]
    );

    if (existingLog.rows.length === 0) {
      // Create new log
      const logId = `log_${Math.random().toString(36).substring(2, 11)}`;
      await query(
        `INSERT INTO "VisitorLog" (id, "ipHash", "path", "visitedAt") 
         VALUES ($1, $2, $3, NOW())`,
        [logId, ip, path]
      );

      // Increment total count
      const statId = `stat_${Math.random().toString(36).substring(2, 11)}`;
      await query(
        `INSERT INTO "VisitorStatistic" (id, path, count, "updatedAt")
         VALUES ($1, $2, 1, NOW())
         ON CONFLICT (path)
         DO UPDATE SET count = "VisitorStatistic".count + 1, "updatedAt" = NOW()`,
        [statId, path]
      );
    }

    // Get total count for response
    const countRes = await query(`SELECT count FROM "VisitorStatistic" WHERE path = $1`, [path]);
    const count = countRes.rows[0]?.count || 0;

    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error("VISITOR_POST_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || 'homepage';

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [todayCount, monthCount, yearCount, totalStat] = await Promise.all([
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE path = $1 AND "visitedAt" >= $2`, [path, startOfToday]),
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE path = $1 AND "visitedAt" >= $2`, [path, startOfMonth]),
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE path = $1 AND "visitedAt" >= $2`, [path, startOfYear]),
      query(`SELECT count FROM "VisitorStatistic" WHERE path = $1`, [path])
    ]);

    return NextResponse.json({
      today: parseInt(todayCount.rows[0].count),
      month: parseInt(monthCount.rows[0].count),
      year: parseInt(yearCount.rows[0].count),
      total: totalStat.rows[0]?.count || 0
    });
  } catch (error: any) {
    console.error("VISITOR_GET_ERROR:", error.message);
    return NextResponse.json({ today: 0, month: 0, year: 0, total: 0 });
  }
}