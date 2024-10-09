"use client";

import { useState, useEffect } from "react";

interface DonationItem {
  itemName: string;
  quantity: number;
}

interface Donation {
  id: number;
  controlNumber: string;
  donationStatus: string;
  statusLogs: { status: string; timestamp: string; remarks: string }[];
  donationItems?: DonationItem[];
}

export default function ManageDonationRequestPosts() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        setDonations(data);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
        setError("Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleUpdateStatus = async (
    donationId: number,
    newStatus: string,
    remarks: string
  ) => {
    try {
      const response = await fetch(`/api/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donationId,
          status: newStatus,
          remarks,
        }),
      });

      if (response.ok) {
        const updatedDonation = await response.json();
        setDonations(
          donations.map((d) => (d.id === donationId ? updatedDonation : d))
        );
      } else {
        throw new Error("Failed to update donation status");
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  if (loading)
    return (
      <div className="loading loading-spinner loading-lg text-primary"></div>
    );
  if (error)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error}</span>
      </div>
    );

  return (
    <div>
      <h1>Manage Donation Request Posts</h1>
      {donations.map((donation) => (
        <DonationStatusUpdate
          key={donation.id}
          donation={donation}
          onUpdateStatus={(newStatus, remarks) =>
            handleUpdateStatus(donation.id, newStatus, remarks)
          }
        />
      ))}
    </div>
  );
}

function DonationStatusUpdate({
  donation,
  onUpdateStatus,
}: {
  donation: Donation;
  onUpdateStatus: (newStatus: string, remarks: string) => void;
}) {
  const [status, setStatus] = useState(donation.donationStatus);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    onUpdateStatus(status, remarks);
  };

  return (
    <div className="border p-4 my-2">
      <h2>Update Status for Donation: {donation.controlNumber}</h2>
      <p>Current Status: {donation.donationStatus}</p>
      <h3>Donated Items:</h3>
      {donation.donationItems && donation.donationItems.length > 0 ? (
        <ul>
          {donation.donationItems.map((item, index) => (
            <li key={index}>
              {item.itemName}: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for this donation.</p>
      )}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="select select-bordered"
      >
        <option value="PLEDGED">Pledged</option>
        <option value="COLLECTED">Collected</option>
        <option value="PROCESSING">Processing</option>
        <option value="IN_TRANSIT">In Transit</option>
        <option value="RECEIVED">Received</option>
      </select>
      <input
        type="text"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="input input-bordered"
      />
      <button onClick={handleSubmit} className="btn btn-primary text-white">
        Update Status
      </button>
    </div>
  );
}
