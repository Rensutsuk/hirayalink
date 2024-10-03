import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipientRequests = await prisma.recipientRequestPost.findMany({
      orderBy: {
        dateTime: 'desc',
      },
    });

    const formattedRequests = recipientRequests.map(request => ({
      ...request,
      uploadedPhoto: request.uploadedPhoto 
        ? Buffer.from(request.uploadedPhoto).toString('base64')
        : null,
      dateTime: request.dateTime.toISOString(),
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error('Error fetching recipient requests:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
