import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  try {
    if (postId) {
      const post = await prisma.barangayRequestPost.findUnique({
        where: { id: postId }, // postId is already a string, no need for conversion
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      // Find the barangay associated with the post
      const barangay = await prisma.barangay.findFirst({
        where: { name: post.barangay },
      });

      if (!barangay) {
        return NextResponse.json(
          { error: "Barangay not found" },
          { status: 404 }
        );
      }

      const donations = await prisma.donation.findMany({
        where: {
          barangayId: barangay.id,
          createdAt: {
            gte: post.dateTime,
          },
        },
        include: {
          statusLogs: true,
          donationItems: true,
        },
      });

      return NextResponse.json(donations);
    } else {
      // Fetch all donations (for admin page)
      const donations = await prisma.donation.findMany({
        include: {
          statusLogs: true,
          donationItems: true,
        },
      });
      return NextResponse.json(donations);
    }
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations", details: error.message },
      { status: 500 }
    );
  }
}
