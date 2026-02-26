// src/lib/data/teacher-data.ts
import { prisma } from "@/lib/prisma";

export async function getStructuralPersonnel() {
  try {
    const data = await prisma.educationPersonnel.findMany({
      orderBy: {
        sort_order: "asc", 
      },
    });
    console.log("Data berhasil ditarik dari VPS:", data.length); // Cek di terminal server
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dari VPS:", error);
    return [];
  }
}