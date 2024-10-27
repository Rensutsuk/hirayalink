"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ViewItemsModal from "./components/ViewItemsModal";
import UpdateStatusModal from "./components/UpdateStatusModal";
import EditPostModal from "./components/EditPostModal";
import { FaBoxOpen, FaInfoCircle } from "react-icons/fa";

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
  donor?: { id: string; name: string };
}

interface BarangayRequestPost {
  id: string;
  dateTime: string;
  donations: Donation[];
  name: string; // This is now the barangay name
  person?: string;
  contactNumber?: string;
  area?: string;
  typeOfCalamity?: string;
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
  const [editingPost, setEditingPost] = useState<BarangayRequestPost | null>(
    null
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch barangay request posts");
        const data: BarangayRequestPost[] = await res.json();
        setPosts(data);
      } catch (error) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationId, status: newStatus, remarks }),
      });
      if (response.ok) {
        const updatedDonation: Partial<Donation> = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => ({
            ...post,
            donations: post.donations.map((donation) =>
              donation.id === updatedDonation.id
                ? { ...donation, ...updatedDonation }
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

  const handleEditPost = async (updatedPost: BarangayRequestPost) => {
    try {
      const response = await fetch(`/api/admin/update-donation-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        const editedPost: BarangayRequestPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editedPost.id ? editedPost : post
          )
        );
        setEditingPost(null);
      } else {
        throw new Error("Failed to update post details");
      }
    } catch (error) {
      console.error("Error updating post details:", error);
    }
  };

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to view this page</div>;
  if (session.user.userType !== "admin")
    return <div>You do not have permission to view this page</div>;
  if (loading) return <div>Loading barangay request posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Donation Request Posts</h1>
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
                  <strong>Barangay:</strong> {post.name}
                </p>
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
              <button
                onClick={() => setEditingPost(post)}
                className="btn btn-sm btn-secondary mt-2"
              >
                Edit Post Details
              </button>
            </div>
            <h4 className="text-md font-semibold mb-2">Donations:</h4>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Control Number</th>
                    <th>Status</th>
                    <th>Donor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {post.donations.map((donation) => (
                    <tr key={donation.id}>
                      <td>{donation.controlNumber}</td>
                      <td>{donation.donationStatus}</td>
                      <td>{donation.donor?.name || "Anonymous"}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setIsViewingItems(true);
                            }}
                            className="btn btn-sm btn-primary text-white"
                            title="View Items"
                          >
                            <FaBoxOpen />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setIsViewingItems(false);
                            }}
                            className="btn btn-sm btn-warning"
                            title="Update Status"
                          >
                            <FaInfoCircle />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
}
