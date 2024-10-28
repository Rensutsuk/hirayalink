import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function GET() {
  try {
    const [calamityImpacts, successStories] = await Promise.all([
      db.calamityImpact.findMany({
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
      db.successStory.findMany({
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
    const formattedCalamityImpacts = calamityImpacts.map(impact => ({
      ...impact,
      createdAt: impact.createdAt.toISOString() // Convert Date to ISO string
    }));

    const formattedSuccessStories = successStories.map(story => ({
      ...story,
      createdAt: story.createdAt.toISOString() // Convert Date to ISO string
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
