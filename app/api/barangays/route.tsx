import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
  }
}
