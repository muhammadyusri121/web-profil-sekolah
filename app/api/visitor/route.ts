import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    // Check if recorded today using raw IP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await query(
      `SELECT id FROM "VisitorLog" 
       WHERE "ip" = $1 AND "visitedAt" >= $2`,
      [ip, today]
    );

    if (existingLog.rows.length === 0) {
      // Create new log
      const logId = `log_${Math.random().toString(36).substring(2, 11)}`;
      await query(
        `INSERT INTO "VisitorLog" (id, "ip", "visitedAt") 
         VALUES ($1, $2, NOW())`,
        [logId, ip]
      );

      // Increment total count
      await query(
        `UPDATE "VisitorStatistic" SET count = count + 1, "updatedAt" = NOW()`
      );
    }

    // Get total count for response
    const countRes = await query(`SELECT count FROM "VisitorStatistic" LIMIT 1`);
    const count = countRes.rows[0]?.count || 0;

    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error("VISITOR_POST_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [todayCount, monthCount, yearCount, totalStat] = await Promise.all([
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE "visitedAt" >= $1`, [startOfToday]),
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE "visitedAt" >= $1`, [startOfMonth]),
      query(`SELECT COUNT(*) FROM "VisitorLog" WHERE "visitedAt" >= $1`, [startOfYear]),
      query(`SELECT count FROM "VisitorStatistic" LIMIT 1`)
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