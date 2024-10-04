import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  const generateControlNumber = () => {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomString}`;
  };

  try {
    const formData = await request.formData();

    const barangayArea = formData.get('barangayArea') as string;
    const calamityType = formData.get('calamityType') as string;
    const contactPerson = formData.get('contactPerson') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const donationDropOff = formData.get('donationDropOff') as string;
    const donationLandmark = formData.get('donationLandmark') as string;
    const necessities = formData.get('necessities') as string;
    const proofFile = formData.get('proofFile') as File;

    let proofFileBuffer: Buffer | null = null;
    if (proofFile) {
      const arrayBuffer = await proofFile.arrayBuffer();
      proofFileBuffer = Buffer.from(arrayBuffer);
    }

    const newPost = await prisma.barangayRequestPost.create({
      data: {
        controlNumber: generateControlNumber(),
        person: contactPerson,
        barangay: barangayArea,
        typeOfCalamity: calamityType,
        contactNumber,
        dropOffAddress: donationDropOff,  
        dropOffLandmark: donationLandmark,
        inKind: necessities,
        image: proofFileBuffer,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating barangay request post:', error);
    return NextResponse.json({ error: 'Failed to create barangay request post' }, { status: 500 });
  }
}