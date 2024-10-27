import React, { useState, useEffect } from "react";

interface BarangayRequestPost {
  id: string;
  person: string;
  contactNumber: string;
  inKind: string;
  specifications: string;
  typeOfCalamity: string;
  area: string;
}

interface RecipientRequestPost {
  id: number;
  completeName: string;
  area: string;
  typeOfCalamity: string;
  dateTime: string;
  inKindNecessities: string;
  specifications: string;
}

interface EditPostModalProps {
  post: BarangayRequestPost;
  onSave: (updatedPost: BarangayRequestPost) => void;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<BarangayRequestPost>(() => {
    const parseJsonSafely = (value: any) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    };

    return {
      ...post,
      inKind: parseJsonSafely(post.inKind),
      specifications: parseJsonSafely(post.specifications),
    };
  });
  const [recipientRequests, setRecipientRequests] = useState<RecipientRequestPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchRecipientRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/donation-requests?calamityType=${post.typeOfCalamity}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching requests: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipientRequests(data.requests || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipientRequests();
  }, [post.typeOfCalamity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const updatedPost = mergeSelectedRequests();
    try {
      const response = await fetch("/api/admin/update-donation-post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const result = await response.json();
      onSave(result.post);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating post:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSelectAll = () => {
    if (selectedRequests.length > 0) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(recipientRequests.map((request) => request.id));
    }
  };

  const handleSelectRequest = (id: number) => {
    setSelectedRequests((prev) =>
      prev.includes(id)
        ? prev.filter((requestId) => requestId !== id)
        : [...prev, id]
    );
  };

  const mergeSelectedRequests = () => {
    const selectedData = recipientRequests.filter((request) =>
      selectedRequests.includes(request.id)
    );

    let mergedInKind = { ...formData.inKind };
    let mergedSpecifications = { ...formData.specifications };

    selectedData.forEach((request) => {
      let recipientInKind, recipientSpecifications;

      // Parse inKindNecessities
      try {
        recipientInKind = JSON.parse(request.inKindNecessities);
      } catch {
        recipientInKind = request.inKindNecessities
          .split(",")
          .map((item) => item.trim());
      }

      // Parse specifications
      try {
        recipientSpecifications = JSON.parse(request.specifications);
      } catch {
        recipientSpecifications = request.specifications
          .split(",")
          .reduce((acc, item) => {
            const [key, value] = item.split(":").map((s) => s.trim());
            acc[key] = value;
            return acc;
          }, {});
      }

      // Merge inKind
      if (Array.isArray(recipientInKind)) {
        recipientInKind.forEach((item) => {
          if (!mergedInKind[item]) {
            mergedInKind[item] = [];
          }
        });
      } else if (typeof recipientInKind === 'object') {
        Object.keys(recipientInKind).forEach((key) => {
          if (!mergedInKind[key]) {
            mergedInKind[key] = [];
          }
          if (Array.isArray(recipientInKind[key])) {
            mergedInKind[key] = [...new Set([...mergedInKind[key], ...recipientInKind[key]])];
          } else if (recipientInKind[key]) {
            mergedInKind[key] = [...new Set([...mergedInKind[key], recipientInKind[key]])];
          }
        });
      }

      // Merge specifications
      Object.entries(recipientSpecifications).forEach(([category, items]) => {
        if (!mergedSpecifications[category]) {
          mergedSpecifications[category] = [];
        }
        if (Array.isArray(items)) {
          mergedSpecifications[category] = [
            ...new Set([...mergedSpecifications[category], ...items]),
          ];
        } else if (items) {
          mergedSpecifications[category] = [
            ...new Set([...mergedSpecifications[category], items]),
          ];
        }
      });
    });

    return {
      ...formData,
      inKind: mergedInKind,
      specifications: mergedSpecifications,
    };
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box max-w-4xl">
          <div className="sticky top-0 flex justify-between items-center bg-primary text-white p-4">
            <h2 className="text-xl font-bold">Edit Barangay Request Post</h2>
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <label className="form-control w-full mb-4">
              <span className="label">
                <span className="label-text">Contact Person:</span>
              </span>
              <input
                name="person"
                value={formData.person}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-4">
              <span className="label">
                <span className="label-text">Contact Number:</span>
              </span>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>

            {/* Recipient Requests Table */}
            <div className="overflow-x-auto mt-4">
              <h3 className="text-lg font-semibold mb-2">Recipient Requests</h3>
              <table className="table w-full bg-white rounded shadow border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-black border-b">Name</th>
                    <th className="p-3 text-black border-b">Area</th>
                    <th className="p-3 text-black border-b">Necessities</th>
                    <th className="p-3 text-black border-b">Date</th>
                    <th className="p-3 text-black border-b w-40">
                      <div className="flex justify-center">
                        <button
                          onClick={handleSelectAll}
                          className="px-3 py-1 rounded w-32 text-white"
                          style={{
                            backgroundColor:
                              selectedRequests.length > 0 ? "#EF4444" : "#10B981",
                            transition: "background-color 0.3s",
                          }}
                        >
                          {selectedRequests.length > 0
                            ? "Deselect All"
                            : "Select All"}
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4 text-red-500">
                        Error: {error}
                      </td>
                    </tr>
                  ) : recipientRequests.length > 0 ? (
                    recipientRequests.map((request) => (
                      <tr
                        key={request.id}
                        className={`hover:bg-gray-50 ${
                          selectedRequests.includes(request.id)
                            ? "bg-green-100"
                            : ""
                        }`}
                      >
                        <td className="p-3 border-b">{request.completeName}</td>
                        <td className="p-3 border-b">{request.area}</td>
                        <td className="p-3 border-b">
                          {request.inKindNecessities}
                        </td>
                        <td className="p-3 border-b">
                          {new Date(request.dateTime).toLocaleDateString()}
                        </td>
                        <td className="p-3 border-b w-40">
                          <div className="flex items-center justify-center">
                            <label className="flex items-center justify-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedRequests.includes(request.id)}
                                onChange={() => handleSelectRequest(request.id)}
                                className="hidden"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out ${
                                  selectedRequests.includes(request.id)
                                    ? "bg-primary border-primary"
                                    : "border-base-200"
                                }`}
                              >
                                {selectedRequests.includes(request.id) && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                )}
                              </div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No recipient requests found for this calamity type.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <button onClick={handleSubmit} className="btn btn-primary">
                Save
              </button>
              <button onClick={onClose} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Success!</h3>
            <p className="py-4">The post has been updated successfully.</p>
            <div className="modal-action">
              <button onClick={handleSuccessModalClose} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPostModal;
