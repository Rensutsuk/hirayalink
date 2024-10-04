import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.contactNumber) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.donor.findUnique({
      where: { contactNumber: session.user.contactNumber },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_recipientRequestPostId: {
          userId,
          recipientRequestPostId: postId,
        },
      },
    });

    if (existingLike) {
      // If the like exists, delete it (unlike)
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // If the like doesn't exist, create a new one
      await prisma.like.create({
        data: {
          userId,
          recipientRequestPostId: postId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Error toggling like' }, { status: 500 });
  }
}
