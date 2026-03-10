import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    let filePath = path.join('/').replace(/\/+/g, '/'); // Cegah double slash
    
    // Alamat internal MinIO di VPS
    const cleanEnv = (val: string | undefined) => val ? val.replace(/^["']|["']$/g, '') : "";
    const MINIO_URL = cleanEnv(process.env.MINIO_INTERNAL_URL || "http://202.52.147.214:9000").replace(/\/$/, "");
    const BUCKET_NAME = cleanEnv(process.env.MINIO_BUCKET || "datasmanka");
    
    // 1. Bersihkan redundansi 'api/files' jika ada (biasanya karena double transformation)
    // Kita bersihkan semua occurrence 'api/files' yang nyelip di path
    filePath = filePath.replace(/api\/files\//g, '').replace(/^\//, '');

    // 2. Jika path sudah mengandung nama bucket di depannya, hapus agar tidak double
    if (filePath.startsWith(`${BUCKET_NAME}/`)) {
        filePath = filePath.replace(`${BUCKET_NAME}/`, '');
    }
    
    // Hilangkan slash di awal jika masih ada
    filePath = filePath.replace(/^\/+/, '');
    
    const targetUrl = `${MINIO_URL}/${BUCKET_NAME}/${filePath}`;

    console.log(`[PROXY] Request: ${path.join('/')}`);
    console.log(`[PROXY] Target: ${targetUrl}`);

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            console.error(`[PROXY] Failed: ${response.status} ${response.statusText}`);
            return new NextResponse('File not found', { status: 404 });
        }

        const data = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        return new NextResponse(data, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error("Proxy Error:", error);
        return new NextResponse('Error fetching file', { status: 500 });
    }
}
