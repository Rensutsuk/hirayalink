import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { name, brgyNumber, contactNumber, address, password } =
			await req.json();

		// Check if all required fields are provided
		if (!name || !brgyNumber || !contactNumber || !address || !password) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}

		// Check if the admin already exists
		const existingAdmin = await prisma.admin.findFirst({
			where: { OR: [{ contactNumber }, { name }] },
		});

		if (existingAdmin) {
			return NextResponse.json(
				{ message: "Admin with this name or contact number already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await hash(password, 10);

		// Create the new admin
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
			{ message: "Admin created successfully", newAdmin },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error in admin signup:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
