import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST method
export async function POST(req: NextRequest) {
	try {
		const { name, brgyNumber, contactNumber, address, password } =
			await req.json();

		// Check if the donor already exists
		const existingAdmin = await prisma.admin.findFirst({
			where: { OR: [{ contactNumber }, { name }] },
		});

		if (existingAdmin) {
			return NextResponse.json(
				{ message: "Admin already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await hash(password, 10);

		// Create the new donor
		const newAdmin = await prisma.admin.create({
			data: {
				name,
				brgyNumber,
				contactNumber,
				address,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{ message: "Admin created", newAdmin },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{ status: 500 }
		);
	}
}
