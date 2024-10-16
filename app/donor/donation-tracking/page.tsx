"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FaClipboardList,
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaHandHolding,
} from "react-icons/fa";

interface DonationItem {
  id: string;
  itemName: string;
  quantity: number;
}

interface StatusLog {
  id: string;
  status: DonationStatus;
  timestamp: string;
  remarks: string | null;
}

interface Donation {
  id: string;
  controlNumber: string;
  donationStatus: DonationStatus;
  statusLogs: StatusLog[];
  donationItems: DonationItem[];
  createdAt: string;
  updatedAt: string;
  barangayId: string;
  donorId: string;
}

enum DonationStatus {
  PLEDGED = "PLEDGED",
  COLLECTED = "COLLECTED",
  PROCESSING = "PROCESSING",
  IN_TRANSIT = "IN_TRANSIT",
  RECEIVED = "RECEIVED"
}

interface Post {
  id: string;
  area: string;
  person: string;
  typeOfCalamity: string;
  inKind: string;
  // Add other post fields as needed
}

export default function DonationTracking() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = postId ? `/api/donations?postId=${postId}` : '/api/donations';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch donations: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched donations:", data);
        setDonations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {postId ? `Donations for Post ID: ${postId}` : "Your Donations"}
      </h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        donations.map((donation) => (
          <DonationTrackingCard key={donation.id} donation={donation} />
        ))
      )}
    </div>
  );
}

function DonationTrackingCard({ donation }: { donation: Donation }) {
  const statusOrder = ["PLEDGED", "COLLECTED", "PROCESSING", "IN_TRANSIT", "RECEIVED"];
  const currentStatusIndex = statusOrder.indexOf(donation.donationStatus);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="bg-green-500 text-white py-2 px-4">{donation.controlNumber}</div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          {statusOrder.map((status, index) => (
            <div key={status} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStatusIndex ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                }`}
              >
                {getStatusIcon(status)}
              </div>
              <div className="text-xs mt-2 text-center">
                {formatStatus(status)}
                <br />
                <span className="text-gray-500">
                  {index <= currentStatusIndex ? getStatusDate(donation, status) : "Date"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {donation.statusLogs.map((log) => (
            <div key={log.id} className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 mr-3"></div>
              <div>
                <div className="text-sm font-semibold">{formatDate(log.timestamp)}</div>
                <div className="text-sm text-gray-600">{log.remarks}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h5 className="font-semibold text-gray-700 mb-2">Donated Items:</h5>
          {donation.donationItems.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {donation.donationItems.map((item) => (
                <li key={item.id}>
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items found for this donation.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusIcon(status: string) {
  switch (status) {
    case "PLEDGED":
      return <FaClipboardList className="w-6 h-6" />;
    case "COLLECTED":
      return <FaCheckCircle className="w-6 h-6" />;
    case "PROCESSING":
      return <FaBox className="w-6 h-6" />;
    case "IN_TRANSIT":
      return <FaTruck className="w-6 h-6" />;
    case "RECEIVED":
      return <FaHandHolding className="w-6 h-6" />;
    default:
      return "❓";
  }
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace("_", " ");
}

function getStatusDate(donation: Donation, status: string) {
  const log = donation.statusLogs.find((log) => log.status === status);
  return log ? formatDate(log.timestamp) : "";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substr(-2)} ${formatTime(date)}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
