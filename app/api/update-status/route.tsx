import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { donationId, status, remarks } = await request.json();

    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
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
        donationItems: true,
      },
    });

    return NextResponse.json(updatedDonation);
  } catch (error) {
    console.error("Error updating donation status:", error);
    return NextResponse.json(
      { error: "Failed to update donation status", details: error },
      { status: 500 }
    );
  }
}



