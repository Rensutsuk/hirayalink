import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("Received donation pledge request");

  try {
    const session = await getServerSession(authOptions);

    const { postId, items } = await request.json();
    console.log("Received data:", { postId, items });

    if (!postId || !items || !Array.isArray(items)) {
      console.log("Invalid request body");
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.findUnique({
      where: { name: session.user.name },
    });

    if (!donor) {
      console.log("Donor not found");
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    console.log("Donor found:", donor.id);

    // Get the barangay from the BarangayRequestPost
    const post = await prisma.barangayRequestPost.findUnique({
      where: { id: Number(postId) },
    });

    if (!post) {
      console.log("BarangayRequestPost not found");
      return NextResponse.json(
        { error: "BarangayRequestPost not found" },
        { status: 404 }
      );
    }

    // Find or create the Barangay
    let barangay = await prisma.barangay.findUnique({
      where: { name: post.barangay },
    });

    if (!barangay) {
      barangay = await prisma.barangay.create({
        data: { name: post.barangay },
      });
    }

    // Create the donation
    const donation = await prisma.donation.create({
      data: {
        controlNumber: post.controlNumber, // Use the post's controlNumber instead of generating a new one
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
    return NextResponse.json(
      { error: "Failed to create donation", details: error.message },
      { status: 500 }
    );
  }
}
