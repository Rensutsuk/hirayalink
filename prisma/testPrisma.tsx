import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Example query: list all donors
    const donors = await prisma.donor.findMany();
    console.log(donors);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
