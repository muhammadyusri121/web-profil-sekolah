import { NextResponse } from "next/server";
import { getHolidays } from '@/lib/data/data_holiday';

export async function GET() {
    try {
        const holidays = await getHolidays();
        return NextResponse.json(holidays);
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return NextResponse.json({ error: "Failed to fetch holidays" }, { status: 500 });
    }
}
