import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const donations = await prisma.donation.findMany({
      include: {
        BarangayRequestPost: true, // Include the related BarangayRequestPost
        donor: true,
        donationItems: true,
        statusLogs: true,
      },
    });

    // Group donations by barangayRequestPostId
    const groupedDonations = donations.reduce((acc, donation) => {
      const postId = donation.barangayRequestPostId;
      if (!acc[postId]) {
        acc[postId] = {
          post: donation.BarangayRequestPost,
          donations: [],
        };
      }
      acc[postId].donations.push(donation);
      return acc;
    }, {});

    return NextResponse.json(groupedDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations", details: error.message },
      { status: 500 }
    );
  }
}
