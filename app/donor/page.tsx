"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface RecipientRequest {
  id: number;
  completeName: string;
  age: number;
  noOfFamilyMembers: number;
  contactNumber: string;
  emailAddress: string | null;
  barangay: string;
  typeOfCalamity: string;
  inKindNecessities: string;
  specifications: string;
  uploadedPhoto: string | null;
  dateTime: string;
}

export default function DonorHome() {
  const [requests, setRequests] = useState<RecipientRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/recipient-requests');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching recipient requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipient Request Posts</h1>
      {requests.map((request) => (
        <div key={request.id} className="mb-8 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{request.completeName}</h2>
          <p><strong>Age:</strong> {request.age}</p>
          <p><strong>Family Members:</strong> {request.noOfFamilyMembers}</p>
          <p><strong>Contact:</strong> {request.contactNumber}</p>
          <p><strong>Email:</strong> {request.emailAddress || 'N/A'}</p>
          <p><strong>Barangay:</strong> {request.barangay}</p>
          <p><strong>Calamity Type:</strong> {request.typeOfCalamity}</p>
          <p><strong>Necessities:</strong> {request.inKindNecessities}</p>
          <p><strong>Specifications:</strong> {request.specifications}</p>
          <p><strong>Date Submitted:</strong> {new Date(request.dateTime).toLocaleString()}</p>
          {request.uploadedPhoto && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Uploaded Photo:</h3>
              <Image
                src={`data:image/jpeg;base64,${request.uploadedPhoto}`}
                alt="Proof of Residence"
                width={300}
                height={200}
                layout="responsive"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
