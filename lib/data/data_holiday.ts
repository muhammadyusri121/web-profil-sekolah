// data/data_beranda/data_holiday.ts
import { query } from '@/lib/db';

export async function getHolidays() {
  try {
    const result = await query('SELECT * FROM "Holiday" ORDER BY date ASC');
    return result.rows;
  } catch (error) {
    console.error("Gagal mengambil data hari libur:", error);
    return [];
  }
}