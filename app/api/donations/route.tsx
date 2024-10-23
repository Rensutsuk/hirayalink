import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const isAdmin = session.user.userType === "admin";

  try {
    let donations;

    if (isAdmin) {
      // Admin view: fetch all donations for the admin's barangay
      const admin = await prisma.admin.findUnique({
        where: { id: session.user.id },
        select: { barangayId: true },
      });

      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
      }

      donations = await prisma.donation.findMany({
        where: { barangayId: admin.barangayId },
        include: {
          statusLogs: true,
          donationItems: true,
          barangay: true,
          donor: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (postId) {
      // Donor view: fetch donations for a specific post's barangay
      donations = await prisma.donation.findMany({
        where: {
          barangayRequestPostId: postId,
          donorId: session.user.id,
        },
        include: {
          statusLogs: true,
          donationItems: true,
          barangay: true,
          donor: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Donor view: fetch all donations for the donor
      donations = await prisma.donation.findMany({
        where: { donorId: session.user.id },
        include: {
          statusLogs: true,
          donationItems: true,
          barangay: true,
          donor: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations", details: error.message },
      { status: 500 }
    );
  }
}
