import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM "AcademicDocument" ORDER BY "createdAt" DESC');
    
    const documents = result.rows.map((doc: any) => {
      // Transform file_path to proxy API if needed
      if (doc.file_path && !doc.file_path.startsWith('http')) {
        const clean = doc.file_path.startsWith('/') ? doc.file_path : `/${doc.file_path}`;
        doc.file_path = `/api/files${clean.replace(/^\/datasmanka\//, '/')}`;
      }
      return doc;
    });

    return NextResponse.json(documents);
  } catch (error: any) {
    console.error("DB_ERROR_ACADEMIC_DOC:", error.message);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}
