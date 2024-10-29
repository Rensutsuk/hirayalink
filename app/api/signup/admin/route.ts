import { NextResponse } from 'next/server';
import { hash } from 'argon2';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, barangayName, contactNumber, address, password } = await req.json();

  // Validate input
  if (!name || !barangayName || !contactNumber || !address || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const barangay = await prisma.barangay.create({
      data: {
        name: barangayName,
      },
    });

		const hashedPassword = await hash(password);

		const admin = await prisma.admin.create({
			data:{
				name,
				contactNumber,
        address,
        password: hashedPassword,
        barangayId: barangay.id,
      },
    });

    return NextResponse.json({ message: 'Admin created successfully', admin }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Handle any other HTTP method
export async function OPTIONS(req: Request) {
  return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
