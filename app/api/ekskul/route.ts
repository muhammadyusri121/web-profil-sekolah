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
            const transform = (item: any) => {
                if (!item) return item;

                if (item.thumbnail && typeof item.thumbnail === 'string' && !item.thumbnail.startsWith('http')) {
                    const cleanPath = item.thumbnail.startsWith('/') ? item.thumbnail : `/${item.thumbnail}`;
                    
                    if (!cleanPath.startsWith('/api/files/')) {
                        const finalPath = cleanPath.replace(/^\/datasmanka\//, '/');
                        item.thumbnail = `/api/files${finalPath}`;
                    }
                }

                item.images = item.thumbnail ? [item.thumbnail] : [];

                if (item.content && typeof item.content === 'string') {
                    const minioRegex = /http:\/\/202\.52\.147\.214:9000\/datasmanka\//g;
                    item.content = item.content.replace(minioRegex, '/api/files/');
                    
                    const relativeUploadsRegex = /src="\/uploads\//g;
                    item.content = item.content.replace(relativeUploadsRegex, 'src="/api/files/uploads/');
                }

                return item;
            };

            data = Array.isArray(data) ? data.map(transform) : transform(data);
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("=== ERROR DATABASE EKSKUL ===");
        return NextResponse.json(
            { error: "Gagal konek DB", detail: error.message },
            { status: 500 }
        );
    }
}