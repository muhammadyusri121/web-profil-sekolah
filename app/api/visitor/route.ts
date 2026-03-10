import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import crypto from 'crypto';

// Fungsi untuk mendapatkan hash IP (Privacy-first)
function getIpHash(ip: string) {
    return crypto.createHash('sha256').update(ip).digest('hex');
}

// Fungsi sederhana untuk memanggil GeoIP API gratis (ipapi.co)
async function getCountryFromIp(ip: string): Promise<string | null> {
    if (!ip || ip === '127.0.0.1' || ip === '::1') return 'ID'; // Default local

    try {
        const res = await fetch(`https://ipapi.co/${ip}/country_name/`, {
            // Timeout agar tidak memperlambat request jika API mati
            signal: AbortSignal.timeout(2000)
        });
        if (res.ok) {
            const country = await res.text();
            return country.trim() || 'Unknown';
        }
    } catch (error) {
        console.warn('GeoIP fetch failed:', error);
    }
    return 'Unknown';
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const path = body.path || 'homepage';

        // Dapatkan IP address (Next.js Request)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        let ip = '127.0.0.1';

        if (forwardedFor) {
            ip = forwardedFor.split(',')[0].trim();
        } else if (realIp) {
            ip = realIp.trim();
        }

        const ipHash = getIpHash(ip);

        // Dapatkan batas hari ini
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Nonaktifkan pengecekan agar setiap POST = 1 kunjungan (untuk testing)
        let country = await getCountryFromIp(ip) || 'Unknown';

        // 1. Selalu catat log detail setiap kali halaman direfresh
        await prisma.visitorLog.create({
            data: {
                ipHash,
                path,
                country,
            }
        });

        // 2. Selalu tambah total counter
        await prisma.visitorStatistic.upsert({
            where: { path },
            update: { count: { increment: 1 } },
            create: { path, count: 1 },
        });

        return NextResponse.json({
            success: true,
            recorded: true,
            country: country
        });

    } catch (error) {
        console.error('Error in Advanced Visitor POST:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const path = searchParams.get('path') || 'homepage';

        const now = new Date();

        // Bounds Hari Ini
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Bounds Bulan Ini
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Bounds Tahun Ini
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        // Jalankan query secara paralel agar cepat
        const [todayCount, monthCount, yearCount, totalVisitorRaw] = await Promise.all([
            // Hari Ini
            prisma.visitorLog.count({
                where: { path, visitedAt: { gte: startOfDay } }
            }),
            // Bulan Ini
            prisma.visitorLog.count({
                where: { path, visitedAt: { gte: startOfMonth } }
            }),
            // Tahun Ini
            prisma.visitorLog.count({
                where: { path, visitedAt: { gte: startOfYear } }
            }),
            // Keseluruhan (amibl dari statistik yang terakumulasi biar cepat)
            prisma.visitorStatistic.findUnique({
                where: { path },
                select: { count: true }
            })
        ]);

        const totalCount = totalVisitorRaw?.count || 0;

        return NextResponse.json({
            today: todayCount,
            month: monthCount,
            year: yearCount,
            total: totalCount
        });

    } catch (error) {
        console.error('Error fetching advanced visitor stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
