import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const barangays = await prisma.barangay.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(barangays);
  } catch (error) {
    console.error("Error fetching barangays:", error);
    return NextResponse.json(
      { error: "Error fetching barangays" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
