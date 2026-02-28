// src/lib/data/teacher-data.ts
import { query } from "@/lib/db";

export async function getStructuralPersonnel() {
  try {
    const result = await query(
      `SELECT * FROM "EducationPersonnel" ORDER BY sort_order ASC`
    );
    const data = result.rows;
    console.log("Data berhasil ditarik dari VPS:", data.length); // Cek di terminal server
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dari VPS:", error);
    return [];
  }
}