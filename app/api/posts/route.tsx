import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type"); 

  try {
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
      return NextResponse.json(posts);
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
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
