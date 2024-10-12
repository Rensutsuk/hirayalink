import React, { useEffect, useState } from "react";

interface Request {
  id: number;
  completeName: string;
  area: string;
  typeOfCalamity: string;
  dateTime: string;
}

const calamityTypes = [
  "All", 
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
        setRequests(responseData.requests || []);
        setTotalPages(responseData.totalPages || 0);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentPage, startDate, endDate, calamityType]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>
      {error && <div className="text-red-500">{error}</div>}

      {/* Filters */}
      <div className="mb-4">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="ml-4">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2 p-1 border rounded"
          />
        </label>

        <label className="ml-4">
          Calamity Type:
          <select
            value={calamityType}
            onChange={(e) => setCalamityType(e.target.value)}
            className="ml-2 p-1 border rounded"
          >
            {calamityTypes.map((type) => (
              <option key={type} value={type === "All" ? "" : type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Area</th>
            <th>Calamity Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.completeName}</td>
                <td>{request.area}</td>
                <td>{request.typeOfCalamity}</td>
                <td>{new Date(request.dateTime).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className="btn btn-primary mx-1"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonationRequestsTable;
