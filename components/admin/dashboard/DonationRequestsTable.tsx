import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Request {
  id: number;
  completeName: string;
  area: string;
  typeOfCalamity: string;
  dateTime: string;
  inKindNecessities: string;
  specifications: string;
}

const calamityTypes = [
  "All",
  "Flood",
  "Earthquake",
  "Tropical Disease",
  "Drought",
  "Dengue Fever",
  "Water Shortage",
  "Heatwave",
  "Tsunami",
  "Leptospirosis",
  "Volcanic Eruption",
  "Landslide",
  "Typhoon",
  "Fire",
];

const DonationRequestsTable = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calamityType, setCalamityType] = useState("");
  const itemsPerPage = 10;
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        let url = `/api/donation-requests?page=${currentPage}&limit=${itemsPerPage}`;

        // Add filters to the API call
        if (startDate && endDate) {
          url += `&startDate=${startDate}&endDate=${endDate}`;
        }
        if (calamityType && calamityType !== "All") {
          url += `&calamityType=${calamityType}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching requests: ${response.statusText}`);
        }

        const responseData = await response.json();

        // Sort the requests by date in descending order (newest first)
        const sortedRequests = (responseData.requests || []).sort(
          (a, b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );

        setRequests(sortedRequests);
        setTotalPages(responseData.totalPages || 0);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentPage, startDate, endDate, calamityType]);

  useEffect(() => {
    setIsPostButtonEnabled(selectedRequests.length > 0);
  }, [selectedRequests]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectAll = () => {
    if (selectedRequests.length > 0) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map((request) => request.id));
    }
  };

  const handleSelectRequest = (id: number) => {
    setSelectedRequests((prev) =>
      prev.includes(id)
        ? prev.filter((requestId) => requestId !== id)
        : [...prev, id]
    );
  };

  const hasSelectedRequests = selectedRequests.length > 0;

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handlePostClick = () => {
    const selectedData = requests.filter((request) =>
      selectedRequests.includes(request.id)
    );
    
    const combinedData = selectedData.reduce((acc, request) => {
      // Combine areas
      acc.areas = [...new Set([...(acc.areas || []), request.area])];
      
      // Combine calamity types
      acc.calamityTypes = [...new Set([...(acc.calamityTypes || []), request.typeOfCalamity])];
      
      // Parse and combine necessities and specifications
      let necessities, specifications;
      try {
        // Try parsing as JSON, if it fails, treat as comma-separated string
        try {
          necessities = JSON.parse(request.inKindNecessities.replace(/'/g, '"'));
        } catch {
          necessities = request.inKindNecessities.split(',').reduce((acc, item) => {
            const [key, value] = item.split(':').map(s => s.trim());
            acc[key] = value;
            return acc;
          }, {});
        }

        try {
          specifications = JSON.parse(request.specifications.replace(/'/g, '"'));
        } catch {
          specifications = request.specifications.split(',').reduce((acc, item) => {
            const [key, value] = item.split(':').map(s => s.trim());
            acc[key] = value;
            return acc;
          }, {});
        }
      } catch (error) {
        console.error("Error parsing data for request:", request.id, error);
        necessities = {};
        specifications = {};
      }
      
      // Combine necessities
      Object.entries(necessities).forEach(([category, items]) => {
        if (!acc.necessities) acc.necessities = {};
        if (!acc.necessities[category]) acc.necessities[category] = new Set();
        if (Array.isArray(items)) {
          items.forEach(item => acc.necessities[category].add(item));
        } else {
          acc.necessities[category].add(items);
        }
      });
      
      // Combine specifications
      Object.entries(specifications).forEach(([category, spec]) => {
        if (!acc.specifications) acc.specifications = {};
        if (!acc.specifications[category]) acc.specifications[category] = new Set();
        acc.specifications[category].add(spec);
      });
      
      return acc;
    }, {});
    
    // Convert Sets to Arrays
    if (combinedData.necessities) {
      Object.keys(combinedData.necessities).forEach(category => {
        combinedData.necessities[category] = Array.from(combinedData.necessities[category]);
      });
    }
    if (combinedData.specifications) {
      Object.keys(combinedData.specifications).forEach(category => {
        combinedData.specifications[category] = Array.from(combinedData.specifications[category]);
      });
    }
    
    console.log("Combined data:", combinedData);
    
    const queryParams = new URLSearchParams({
      areas: combinedData.areas.join(','),
      calamityTypes: combinedData.calamityTypes.join(','),
      necessities: JSON.stringify(combinedData.necessities || {}),
      specifications: JSON.stringify(combinedData.specifications || {}),
    });

    router.push(`/admin/admin-request-donation?${queryParams.toString()}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-white rounded shadow border border-gray-200">
        <thead>
          <tr>
            <th colSpan={7} className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">
                      Start Date:
                    </span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input input-primary input-sm p-1 border rounded text-sm w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">
                      End Date:
                    </span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input input-primary input-sm p-1 border rounded text-sm w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">
                      Calamity Type:
                    </span>
                    <select
                      value={calamityType}
                      onChange={(e) => setCalamityType(e.target.value)}
                      className="select select-primary select-sm p-1 border rounded text-sm w-40"
                    >
                      {calamityTypes.map((type) => (
                        <option key={type} value={type === "All" ? "" : type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handlePostClick}
                    disabled={!isPostButtonEnabled}
                    className={`btn btn-primary text-white ${
                      !isPostButtonEnabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </th>
          </tr>
          <tr className="bg-gray-50">
            <th className="p-3 text-black border-b">Name</th>
            <th className="p-3 text-black border-b">Area</th>
            <th className="p-3 text-black border-b">Calamity Type</th>
            <th className="p-3 text-black border-b">Necessities</th>
            <th className="p-3 text-black border-b">Date</th>
            <th className="p-3 text-black border-b w-40"></th>
            <th className="p-3 text-black border-b w-40">
              <div className="flex justify-center">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 rounded w-32 text-white"
                  style={{
                    backgroundColor: hasSelectedRequests
                      ? "#EF4444"
                      : "#10B981",
                    transition: "background-color 0.3s",
                  }}
                >
                  {hasSelectedRequests ? "Deselect All" : "Select All"}
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
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{request.completeName}</td>
                <td className="p-3 border-b">{request.area}</td>
                <td className="p-3 border-b">{request.typeOfCalamity}</td>
                <td className="p-3 border-b">
                  {request.inKindNecessities &&
                  typeof request.inKindNecessities === "string"
                    ? request.inKindNecessities
                    : "No necessities specified"}
                </td>
                <td className="p-3 border-b">
                  {new Date(request.dateTime).toLocaleDateString()}
                </td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleViewRequest(request)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    View
                  </button>
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
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="p-4">
              <div className="flex justify-center items-center join">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`join-item btn btn-sm btn-square mx-1 ${
                      currentPage === index + 1
                        ? "btn-primary btn-active text-white"
                        : "btn-primary text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="bg-primary text-white text-2xl font-bold p-5">Request Details</h2>
            <div className="space-y-4 bg-white p-4">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedRequest.completeName}
              </p>
              <p>
                <span className="font-semibold">Area:</span>{" "}
                {selectedRequest.area}
              </p>
              <p>
                <span className="font-semibold">Calamity Type:</span>{" "}
                {selectedRequest.typeOfCalamity}
              </p>
              <p>
                <span className="font-semibold">In-Kind Necessities:</span>
                {(() => {
                  try {
                    let necessities, specifications;

                    // Try parsing as JSON, if it fails, treat as comma-separated string
                    try {
                      necessities = JSON.parse(selectedRequest.inKindNecessities.replace(/'/g, '"'));
                    } catch {
                      necessities = selectedRequest.inKindNecessities.split(',').reduce((acc, item) => {
                        const [key, value] = item.split(':').map(s => s.trim());
                        acc[key] = value;
                        return acc;
                      }, {});
                    }

                    try {
                      specifications = JSON.parse(selectedRequest.specifications.replace(/'/g, '"'));
                    } catch {
                      specifications = selectedRequest.specifications.split(',').reduce((acc, item) => {
                        const [key, value] = item.split(':').map(s => s.trim());
                        acc[key] = value;
                        return acc;
                      }, {});
                    }

                    return Object.entries(necessities).map(([category, items], index) => (
                      <div key={index} className="m-2">
                        <strong>{category}:</strong>{" "}
                        {Array.isArray(items) 
                          ? items.join(", ")
                          : items}
                        <span className="ml-2">
                          {specifications[category] 
                            ? specifications[category]
                            : "No Specifications"}
                        </span>
                      </div>
                    ));
                  } catch (error) {
                    console.error("Error parsing necessities or specifications:", error);
                    return (
                      <div>
                        <div>{selectedRequest.inKindNecessities}</div>
                        <div>{selectedRequest.specifications}</div>
                      </div>
                    );
                  }
                })()}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedRequest.dateTime).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end m-4">
              <button onClick={closeModal} className="btn btn-primary text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestsTable;
