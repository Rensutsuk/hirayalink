"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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

interface GroupedDonations {
  [postId: string]: Donation[];
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
}

export default function ManageDonationRequestPosts() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<BarangayRequestPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isViewingItems, setIsViewingItems] = useState(false);
  const [editingPost, setEditingPost] = useState<BarangayRequestPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching barangay request posts for admin");
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch barangay request posts");
        const data: BarangayRequestPost[] = await res.json();
        console.log("Fetched barangay request posts:", data);
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
        setPosts(prevPosts => 
          prevPosts.map(post => ({
            ...post,
            donations: post.donations.map(donation => 
              donation.id === updatedDonation.id ? {
                ...donation,
                ...updatedDonation,
                donor: donation.donor // Preserve the existing donor information
              } : donation
            )
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
      const response = await fetch(`/api/edit-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const editedPost: BarangayRequestPost = await response.json();
        setPosts(prevPosts =>
          prevPosts.map(post =>
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
  if (session.user.userType !== "admin") return <div>You do not have permission to view this page</div>;
  if (loading) return <div>Loading barangay request posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Donation Request Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-8 border rounded shadow overflow-hidden">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Post ID: {post.id}</h2>
            <p>{new Date(post.dateTime).toLocaleString()}</p>
          </div>
          <div className="p-4">
            <div className="flex mb-4">
              <div className="w-1/2">
                <p><strong>Barangay:</strong> {post.barangayName}</p>
                <p><strong>Contact Person:</strong> {post.contactPerson}</p>
                <p><strong>Contact Number:</strong> {post.contactNumber}</p>
              </div>
              <div className="w-1/2">
                <p><strong>Area:</strong> {post.area}</p>
                <p><strong>Type of Calamity:</strong> {post.typeOfCalamity}</p>
              </div>
              <button
                onClick={() => setEditingPost(post)}
                className="btn btn-sm btn-secondary mt-2"
              >
                Edit Post Details
              </button>
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
                {post.donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="border p-2">{donation.controlNumber}</td>
                    <td className="border p-2">{donation.donationStatus}</td>
                    <td className="border p-2">{donation.donor?.name || 'Anonymous'}</td>
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
                ))}
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
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleEditPost}
        />
      )}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Donation Items: {donation.controlNumber}</h2>
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
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdateStatusModal({
  donation,
  onClose,
  onUpdateStatus,
}: {
  donation: Donation;
  onClose: () => void;
  onUpdateStatus: (donationId: number, newStatus: string, remarks: string) => void;
}) {
  const [status, setStatus] = useState(donation.donationStatus);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    const confirmed = window.confirm("Are you sure you want to update the status of this donation?");
    if (confirmed) {
      onUpdateStatus(donation.id, status, remarks);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Update Status: {donation.controlNumber}</h2>
        <p>Current Status: {donation.donationStatus}</p>
        <div className="mt-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full max-w-xs mr-2"
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
            className="input input-bordered w-full max-w-xs mt-2"
          />
          <div className="flex justify-end mt-4">
            <button onClick={handleSubmit} className="btn btn-primary text-white mr-2">
              Update Status
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditPostModal({
  post,
  onClose,
  onSave,
}: {
  post: BarangayRequestPost;
  onClose: () => void;
  onSave: (updatedPost: BarangayRequestPost) => void;
}) {
  const [area, setArea] = useState(post.area);
  const [typeOfCalamity, setTypeOfCalamity] = useState(post.typeOfCalamity);
  const [inKindNecessities, setInKindNecessities] = useState(post.inKind);
  const [specifications, setSpecifications] = useState(post.specifications);
  const [barangay, setBarangay] = useState(post.barangay?.name || "");
  const [contactPerson, setContactPerson] = useState(post.person || "");
  const [newInKindNecessities, setNewInKindNecessities] = useState("");
  const [newSpecifications, setNewSpecifications] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...post,
      area,
      typeOfCalamity,
      inKind: inKindNecessities + (newInKindNecessities ? `, ${newInKindNecessities}` : ""),
      specifications: specifications + (newSpecifications ? `, ${newSpecifications}` : ""),
      barangay: { name: barangay },
      person: contactPerson,
    });
  };

  const handleAdd = () => {
    // Logic to add new in-kind necessities and specifications
    const selectedRequest = availableRequests.find(
      (request) => request.area === area && request.typeOfCalamity === typeOfCalamity
    );

    if (selectedRequest) {
      setNewInKindNecessities(selectedRequest.inKindNecessities);
      setNewSpecifications(selectedRequest.specifications);
    } else {
      alert("No matching request found for the selected area and calamity type.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Edit Post Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Barangay</label>
            <input
              type="text"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Contact Person</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Type of Calamity</label>
            <input
              type="text"
              value={typeOfCalamity}
              onChange={(e) => setTypeOfCalamity(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end mb-4">
            <button onClick={handleAdd} className="btn btn-primary">
              Add
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">In-Kind Necessities</label>
            <textarea
              value={inKindNecessities + (newInKindNecessities ? `, ${newInKindNecessities}` : "")}
              onChange={(e) => setInKindNecessities(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Specifications</label>
            <textarea
              value={specifications + (newSpecifications ? `, ${newSpecifications}` : "")}
              onChange={(e) => setSpecifications(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mr-2">Save</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
