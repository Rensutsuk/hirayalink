import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract data from formData
    const barangay = formData.get('barangayArea');
    const person = formData.get('contactPerson');
    const typeOfCalamity = formData.get('calamityType');
    const contactNumber = formData.get('contactNumber');
    const dropOffAddress = formData.get('donationDropOff');
    const dropOffLandmark = formData.get('donationLandmark');
    const necessities = formData.getAll('necessities');
    const proofFile = formData.get('proofFile');

    // Convert the proofFile to a buffer if needed
    let imageBuffer = null;
    if (proofFile) {
      const arrayBuffer = await proofFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    // Create a new donation request in the database
    const donationRequest = await prisma.barangayRequestPost.create({
      data: {
        barangay,
        person,
        typeOfCalamity,
        contactNumber,
        dropOffAddress,
        dropOffLandmark,
        inKind: necessities.join(', '),
        image: imageBuffer,
      },
    });

    return NextResponse.json({ message: 'Form submitted successfully!', donationRequest }, { status: 200 });
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({ message: 'Error processing form data.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}