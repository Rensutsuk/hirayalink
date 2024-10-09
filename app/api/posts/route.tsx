import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type"); 
  const session = await getServerSession(authOptions);
  const userContactNumber = session?.user?.contactNumber;

  try {
    const user = await prisma.donor.findUnique({
      where: {
        contactNumber: userContactNumber,
      },
      select: {
        id: true,
      }
    });

    if (type === "barangay") {
      const posts = await prisma.barangayRequestPost.findMany({
        include: {
          likes: {
            select: {
              id: true,
              userId: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              userId: true,
              createdAt: true,
            },
          },
        },
      });

      // Add likedByUser property
      const postsWithLikes = posts.map(post => ({
        ...post,
        likedByUser: post.likes.some(like => like.userId === user?.id),
      }));

      return NextResponse.json(postsWithLikes);
    }
    if (type === "recipient") {
      const posts = await prisma.recipientRequestPost.findMany({
        include: {
          likes: {
            select: {
              id: true,
              userId: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              userId: true,
              createdAt: true,
            },
          },
        },
      });

      // Add likedByUser property
      const postsWithLikes = posts.map(post => ({
        ...post,
        likedByUser: post.likes.some(like => like.userId === user?.id),
      }));

      return NextResponse.json(postsWithLikes);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
