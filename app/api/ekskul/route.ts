import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const ekskulName = searchParams.get('ekskul_name');
        const slug = searchParams.get('slug');

        let result;

        if (slug && ekskulName) {
            result = await query(
                'SELECT * FROM "Extracurricular" WHERE slug = $1 AND ekskul_name = $2 AND is_published = true',
                [slug, ekskulName]
            );
        } else if (slug) {
            result = await query(
                'SELECT * FROM "Extracurricular" WHERE slug = $1 AND is_published = true',
                [slug]
            );
        } else if (ekskulName) {
            result = await query(
                'SELECT * FROM "Extracurricular" WHERE ekskul_name = $1 AND is_published = true ORDER BY "createdAt" DESC',
                [ekskulName]
            );
        } else {
            result = await query(
                'SELECT * FROM "Extracurricular" WHERE is_published = true ORDER BY "createdAt" DESC'
            );
        }

        let data = slug ? (result.rows[0] || null) : result.rows;

        if (data) {
            const transformThumbnail = (item: any) => {
                let thumbnail = item.thumbnail;

                if (thumbnail && !thumbnail.startsWith('http')) {
                    const rawPath = thumbnail.replace('/api/files/', '');
                    thumbnail = `http://202.52.147.214:9000/datasmanka/${rawPath}`;
                }
                item.thumbnail = thumbnail;
                return item;
            };

            if (Array.isArray(data)) {
                data = data.map(transformThumbnail);
            } else {
                data = transformThumbnail(data);
            }
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("=== ERROR DATABASE EKSKUL ===");
        console.error(error.message);

        return NextResponse.json(
            { error: "Gagal konek DB", detail: error.message },
            { status: 500 }
        );
    }
}
