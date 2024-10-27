import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, person, contactNumber, inKind, specifications } = body;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const updatedPost = await prisma.barangayRequestPost.update({
      where: { id },
      data: {
        person,
        contactNumber,
        inKind: typeof inKind === 'string' ? JSON.parse(inKind) : inKind,
        specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications,
      },
    });

    return NextResponse.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'An error occurred while updating the post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
