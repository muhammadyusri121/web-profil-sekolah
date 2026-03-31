import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const className = searchParams.get('class');

        let result;
        if (className) {
            result = await query(
                `SELECT s.*, pt.time, p.full_name AS teacher_name
         FROM "SchoolSchedule" s
         LEFT JOIN "PeriodTime" pt ON s.period = pt.id
         LEFT JOIN "EducationPersonnel" p ON s.teacher_nip = p.nip
         WHERE s.class_name = $1
         ORDER BY 
             CASE s.day_of_week
                 WHEN 'Senin' THEN 1
                 WHEN 'Selasa' THEN 2
                 WHEN 'Rabu' THEN 3
                 WHEN 'Kamis' THEN 4
                 WHEN 'Jumat' THEN 5
                 WHEN 'Sabtu' THEN 6
                 ELSE 7
             END,
             s.period`,
                [className]
            );
        } else {
            // Ambil semua kelas yang tersedia (distinct)
            result = await query(
                `SELECT DISTINCT class_name FROM "SchoolSchedule" ORDER BY class_name`
            );
        }

        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error('=== ERROR SCHEDULE ===', error.message);
        return NextResponse.json(
            { error: 'Gagal mengambil jadwal', detail: error.message },
            { status: 500 }
        );
    }
}
