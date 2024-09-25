import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getRecipientRequests() {
  return await prisma.recipientRequestPost.findMany({
    orderBy: {
      dateTime: "desc",
    },
    select: {
      id: true,
      completeName: true,
      dateTime: true,
      age: true,
      noOfFamilyMembers: true,
      barangay: true,
      typeOfCalamity: true,
      inKindNecessities: true,
      specifications: true,
    },
  });
}

export default async function Timeline() {
  const requests = await getRecipientRequests();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Donation Request Timeline</h1>
      <div className="space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{request.completeName}</h2>
              <span className="text-sm text-gray-500">
                {new Date(request.dateTime).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Age:</strong> {request.age}
                </p>
                <p>
                  <strong>Family Members:</strong> {request.noOfFamilyMembers}
                </p>
                <p>
                  <strong>Barangay:</strong> {request.barangay}
                </p>
                <p>
                  <strong>Calamity Type:</strong> {request.typeOfCalamity}
                </p>
              </div>
              <div>
                <p>
                  <strong>Necessities:</strong> {request.inKindNecessities}
                </p>
                <p>
                  <strong>Specifications:</strong> {request.specifications}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
