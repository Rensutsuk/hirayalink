import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { donationId, status, remarks } = await request.json();

    const updatedDonation = await prisma.donation.update({
      where: { id: Number(donationId) },
      data: {
        donationStatus: status,
        statusLogs: {
          create: {
            status,
            remarks,
          },
        },
      },
      include: {
        statusLogs: true,
      },
    });

    return NextResponse.json(updatedDonation);
  } catch (error) {
    console.error("Error updating donation status:", error);
    return NextResponse.json(
      { error: "Failed to update donation status" },
      { status: 500 }
    );
  }
}
