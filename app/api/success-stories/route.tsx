import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import crypto from 'crypto';

const prisma = new PrismaClient();

export default prisma;

export async function GET(req: Request) {
  try {
    console.log("GET request received");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminId = session.user.id;
    console.log("Admin ID:", adminId);

    // Get admin's barangay number
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { barangayId: true },
    });
    console.log("Admin:", admin);

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Get barangay request posts for this admin
    const barangayRequestPosts = await prisma.barangayRequestPost.findMany({
      where: { barangayId: admin.barangayId },
      select: {
        id: true,
        dateTime: true,
        area: true,
        barangayId: true,
        typeOfCalamity: true,
      },
      orderBy: { dateTime: 'desc' },
    });

    // Fetch donor IDs for each barangay request post
    const postsWithDonorIds = await Promise.all(
      barangayRequestPosts.map(async (post) => {
        const donations = await prisma.donation.findMany({
          where: {
            barangayId: post.barangayId,
            donationStatus: {
              in: ['COLLECTED', 'PROCESSING', 'IN_TRANSIT', 'RECEIVED']
            },
            createdAt: {
              gte: post.dateTime, // Donations made after the post was created
              lte: new Date(post.dateTime.getTime() + 7 * 24 * 60 * 60 * 1000) // Within 7 days of the post
            }
          },
          select: {
            donorId: true,
          },
          distinct: ['donorId'],
        });
        const donorIds = donations.map(donation => donation.donorId);
        return { ...post, donorIds };
      })
    );

    return NextResponse.json({ barangayId: admin.barangayId, barangayRequestPosts: postsWithDonorIds });
  } catch (error) {
    console.error('Error in GET /api/success-stories:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      postId,
      barangayNumberArea,
      nameOfCalamity,
      controlNumber,
      transactionIds,
      batchNumber,
      numberOfRecipients,
      storyText,
      image
    } = await req.json();

    // Create success story
    const successStory = await prisma.successStory.create({
      data: {
        postId,
        barangayNumberArea,
        nameOfCalamity,
        controlNumber,
        transactionIds,
        batchNumber,
        numberOfRecipients: parseInt(numberOfRecipients),
        storyText,
        image: image ? Buffer.from(image, 'base64') : null,
      },
    });

    return NextResponse.json(successStory);
  } catch (error) {
    console.error('Error in POST /api/success-stories:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
