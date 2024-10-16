import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'; // Make sure to install this package: npm install uuid

const prisma = new PrismaClient();

function validateDonationData(postId: string, items: any[]): string | null {
  if (typeof postId !== 'string' || postId.trim() === '') {
    return 'Invalid postId';
  }
  if (!Array.isArray(items) || items.length === 0) {
    return 'Invalid items array';
  }
  for (const item of items) {
    if (typeof item.name !== 'string' || item.name.trim() === '') {
      return 'Invalid item name';
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return 'Invalid item quantity';
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, items } = await request.json();

    const post = await prisma.barangayRequestPost.findUnique({
      where: { id: postId },
      include: { Barangay: true },
    });

    if (!post || !post.barangayId) {
      return NextResponse.json({ error: "Invalid post or barangay" }, { status: 404 });
    }

    const controlNumber = uuidv4();

    const donation = await prisma.donation.create({
      data: {
        controlNumber: controlNumber,
        donorId: session.user.id,
        barangayId: post.barangayId, // Use the barangayId from the post
        donationStatus: "PLEDGED",
        donationItems: {
          create: items.map((item) => ({
            itemName: item.name,
            quantity: item.quantity,
          })),
        },
        statusLogs: {
          create: {
            status: "PLEDGED",
            remarks: "Initial pledge",
          },
        },
      },
      include: {
        donationItems: true,
        statusLogs: true,
        barangay: true,
        donor: true,
      },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json(
      { error: "Failed to create donation", details: error.message },
      { status: 500 }
    );
  }
}
