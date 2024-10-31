import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [calamityImpacts, successStories] = await Promise.all([
      prisma.calamityImpact.findMany({
        select: {
          id: true,
          area: true,
          nameOfCalamity: true,
          storyText: true,
          image: true,
          createdAt: true,
          Barangay: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }),
      prisma.successStory.findMany({
        select: {
          id: true,
          area: true,
          nameOfCalamity: true,
          storyText: true,
          image: true,
          createdAt: true,
          controlNumber: true,
          transactionIds: true,
          batchNumber: true,
          numberOfRecipients: true,
          Barangay: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      })
    ]);

    // Format the dates before sending
    const formattedCalamityImpacts = calamityImpacts.map((impact: any) => ({
      ...impact,
      createdAt: impact.createdAt.toISOString()
    }));

    const formattedSuccessStories = successStories.map((story: any) => ({
      ...story,
      createdAt: story.createdAt.toISOString()
    }));

    return NextResponse.json({ 
      calamityImpacts: formattedCalamityImpacts, 
      successStories: formattedSuccessStories 
    });
  } catch (error) {
    console.error('Error fetching slides:', error);
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}
