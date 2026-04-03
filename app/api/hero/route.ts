import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      `SELECT * FROM "HeroContent" 
       WHERE "is_active" = true 
       ORDER BY "sort_order" ASC`
    );

    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error: any) {
    console.error('HERO_GET_ERROR:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: 'Database Error' 
    }, { status: 500 });
  }
}
