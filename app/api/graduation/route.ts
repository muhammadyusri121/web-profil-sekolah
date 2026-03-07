import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        console.log("=== GET ALL GRADUATION DATA ===");

        const result = await query('SELECT * FROM "Graduation"');

        console.log("Total data ditemukan:", result.rows.length);

        return NextResponse.json(result.rows);

    } catch (error: any) {
        console.error("DATABASE CONNECTION ERROR:", error.message);
        return NextResponse.json(
            { error: "Gagal terhubung ke database", detail: error.message },
            { status: 500 }
        );
    }
}
