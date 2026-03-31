import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.schoolProfile.findFirst();
    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("Error fetching school profile:", error);
    return NextResponse.json({ error: "Failed to fetch school profile" }, { status: 500 });
  }
}
