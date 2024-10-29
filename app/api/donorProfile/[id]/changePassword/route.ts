import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import argon2 from "argon2";
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.id !== params.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Fetch the donor from the database
    const donor = await prisma.donor.findUnique({
      where: { id: params.id },
    });

    if (!donor) {
      return NextResponse.json({ message: "Donor not found" }, { status: 404 });
    }

    // Verify the current password
    const isPasswordValid = await argon2.verify(
      donor.password,
      currentPassword
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await argon2.hash(newPassword);

    // Update the donor's password
    await prisma.donor.update({
      where: { id: params.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
