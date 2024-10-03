import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const completeName = formData.get('completeName') as string;
    const age = parseInt(formData.get('age') as string);
    const noOfFamilyMembers = parseInt(formData.get('noOfFamilyMembers') as string);
    const contactNumber = formData.get('contactNumber') as string;
    const emailAddress = formData.get('emailAddress') as string;
    const barangay = formData.get('barangay') as string;
    const typeOfCalamity = formData.get('typeOfCalamity') as string;
    const inKindNecessities = formData.get('inKindNecessities') as string;
    const specifications = formData.get('specifications') as string;
    const proofOfResidence = formData.get('proofOfResidence') as File;

    let proofOfResidenceBuffer: Buffer | null = null;
    if (proofOfResidence) {
      const arrayBuffer = await proofOfResidence.arrayBuffer();
      proofOfResidenceBuffer = Buffer.from(arrayBuffer);
    }

    const newPost = await prisma.recipientRequestPost.create({
      data: {
        completeName,
        age,
        noOfFamilyMembers,
        contactNumber,
        emailAddress,
        barangay,
        typeOfCalamity,
        inKindNecessities,
        specifications,
        uploadedPhoto: proofOfResidenceBuffer,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating recipient request post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
