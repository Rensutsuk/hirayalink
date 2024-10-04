import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

export async function GET() {
  console.log('GET /api/posts called');
  try {
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
    console.log('Posts fetched:', posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}
