import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST method
export async function POST(req: NextRequest) {
	try {
		const { name, orgName, contactNumber, address, password } =
			await req.json();

		// Check if the donor already exists
		const existingDonor = await prisma.donor.findFirst({
			where: { OR: [{ contactNumber }, { name }] },
		});

		if (existingDonor) {
			return NextResponse.json(
				{ message: "Donor already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await hash(password, 10);

		// Create the new donor
		const newDonor = await prisma.donor.create({
			data: {
				name,
				orgName,
				contactNumber,
				address,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{ message: "Donor created", newDonor },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{ status: 500 }
		);
	}
}
