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
  console.log("Received donation pledge request");

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, items } = await request.json();
    console.log("Received data:", { postId, items });

    const donor = await prisma.donor.findUnique({
      where: { name: session.user.name },
    });

    if (!donor) {
      console.log("Donor not found for user:", session.user.name);
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    const post = await prisma.barangayRequestPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      console.log("BarangayRequestPost not found for id:", postId);
      return NextResponse.json({ error: "BarangayRequestPost not found" }, { status: 404 });
    }

    let barangay = await prisma.barangay.findUnique({
      where: { name: post.barangay },
    });

    if (!barangay) {
      console.log("Creating new barangay:", post.barangay);
      barangay = await prisma.barangay.create({
        data: { name: post.barangay },
      });
    }

    // Generate a unique controlNumber
    const controlNumber = uuidv4();

    // Log the data before creating the donation
    console.log("Creating donation with data:", {
      controlNumber: controlNumber,
      donorId: donor.id,
      barangayId: barangay.id,
      items: items,
    });

    const donation = await prisma.donation.create({
      data: {
        controlNumber: controlNumber,
        donorId: donor.id,
        barangayId: barangay.id,
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
      },
    });

    console.log("Donation created:", donation);

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error("Error creating donation:", error);
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: "Failed to create donation", 
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
