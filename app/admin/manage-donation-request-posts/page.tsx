"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

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
  donor?: {
    id: string;
    name: string;
  };
}

interface BarangayRequestPost {
  id: string;
  dateTime: string;
  donations: Donation[];
  name?: string;
  person?: string;
  contactNumber?: string;
  area?: string;
  typeOfCalamity?: string;
  inKind?: string;
  specifications?: string;
  barangay?: {
    name: string;
  };
}

export default function ManageDonationRequestPosts() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<BarangayRequestPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );
  const [isViewingItems, setIsViewingItems] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching barangay request posts for admin");
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch barangay request posts");
        const data: BarangayRequestPost[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch barangay request posts:", error);
        setError("Failed to fetch barangay request posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [session, status]);

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
        const updatedDonation: Partial<Donation> = await response.json();

        // Update the local state
        setPosts((prevPosts) =>
          prevPosts.map((post) => ({
            ...post,
            donations: post.donations.map((donation) =>
              donation.id === updatedDonation.id
                ? {
                    ...donation,
                    ...updatedDonation,
                    donor: donation.donor, // Preserve the existing donor information
                  }
                : donation
            ),
          }))
        );

        setSelectedDonation(null);
      } else {
        throw new Error("Failed to update donation status");
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  if (status === "loading") return <Loading />;
  if (!session) return <div>Please log in to view this page</div>;
  if (session.user.userType !== "admin")
    return <div>You do not have permission to view this page</div>;
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="hero-background bg-cover max-h-[30rem] sticky top-0 z-10">
        <div className="py-10 text-center backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white">
            Manage Donation Request Posts
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-8 border rounded shadow overflow-hidden"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Post ID: {post.id}</h2>
              <p>{new Date(post.dateTime).toLocaleString()}</p>
            </div>
            <div className="p-4">
              <div className="flex mb-4">
                <div className="w-1/2">
                  <p>
                    <strong>Contact Person:</strong> {post.person}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {post.contactNumber}
                  </p>
                </div>
                <div className="w-1/2">
                  <p>
                    <strong>Area:</strong> {post.area}
                  </p>
                  <p>
                    <strong>Type of Calamity:</strong> {post.typeOfCalamity}
                  </p>
                </div>
              </div>
              <h4 className="text-md font-semibold mb-2">Donations:</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Control Number</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Donor</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {post.donations.length > 0 ? (
                    post.donations.map((donation) => (
                      <tr key={donation.id}>
                        <td className="border p-2">{donation.controlNumber}</td>
                        <td className="border p-2">{donation.donationStatus}</td>
                        <td className="border p-2">
                          {donation.donor?.name || "Anonymous"}
                        </td>
                        <td className="border p-2">
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setIsViewingItems(true);
                            }}
                            className="btn btn-sm btn-primary mr-2"
                          >
                            View Items
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setIsViewingItems(false);
                            }}
                            className="btn btn-sm btn-secondary"
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="border p-4 text-center text-gray-500">
                        No donations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {selectedDonation && isViewingItems && (
          <ViewItemsModal
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
          />
        )}
        {selectedDonation && !isViewingItems && (
          <UpdateStatusModal
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
}

function ViewItemsModal({
  donation,
  onClose,
}: {
  donation: Donation;
  onClose: () => void;
}) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4 bg-primary text-white p-5">
          Donation Items: {donation.controlNumber}
        </h2>
        <div className="p-5">
          {donation.donationItems && donation.donationItems.length > 0 ? (
            <ul className="list-disc list-inside">
              {donation.donationItems.map((item, index) => (
                <li key={index}>
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found for this donation.</p>
          )}
          <div className="modal-action">
            <button onClick={onClose} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}

function UpdateStatusModal({
  donation,
  onClose,
  onUpdateStatus,
}: {
  donation: Donation;
  onClose: () => void;
  onUpdateStatus: (
    donationId: number,
    newStatus: string,
    remarks: string
  ) => void;
}) {
  const [status, setStatus] = useState(donation.donationStatus);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    const confirmed = window.confirm(
      "Are you sure you want to update the status of this donation?"
    );
    if (confirmed) {
      onUpdateStatus(donation.id, status, remarks);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4 bg-primary text-white p-5">
          Update Status: {donation.controlNumber}
        </h2>
        <div className="p-5">
          <p className="mb-2 font-semibold">Current Status: {donation.donationStatus}</p>
          <div className="mt-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full mb-2"
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
              className="input input-bordered w-full"
            />
            <div className="modal-action">
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Update Status
              </button>
              <button onClick={onClose} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
