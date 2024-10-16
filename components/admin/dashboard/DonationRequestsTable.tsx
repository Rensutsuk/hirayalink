import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

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
  "Dengue Fever",
  "Drought",
  "Earthquake",
  "Fire",
  "Flood",
  "Heatwave",
  "Landslide",
  "Leptospirosis",
  "Tropical Disease",
  "Tsunami",
  "Typhoon",
  "Volcanic Eruption",
  "Water Shortage"
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
        const sortedRequests = (responseData.requests || []).sort((a, b) => 
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
      setSelectedRequests(requests.map(request => request.id));
    }
  };

  const handleSelectRequest = (id: number) => {
    setSelectedRequests(prev => 
      prev.includes(id) ? prev.filter(requestId => requestId !== id) : [...prev, id]
    );
  };

  const hasSelectedRequests = selectedRequests.length > 0;

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handlePostClick = () => {
    const selectedData = requests.filter(request => selectedRequests.includes(request.id));
    const necessities = [...new Set(selectedData.flatMap(request => request.inKindNecessities.split(', ')))];
    const specifications = [...new Set(selectedData.flatMap(request => request.specifications.split(', ')))];
    const areas = [...new Set(selectedData.map(request => request.area))];
    const calamityTypes = [...new Set(selectedData.map(request => request.typeOfCalamity))];
    
    const queryParams = new URLSearchParams({
      necessities: necessities.join(','),
      specifications: specifications.join(','),
      area: areas.join(', '),
      calamityType: calamityTypes.join(', ')
    });
    
    router.push(`/admin/admin-request-donation?${queryParams.toString()}`);
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table w-full bg-white rounded-lg shadow-md border border-gray-200">
        <thead>
          <tr>
            <th colSpan={7} className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-black mb-2 md:mb-0">
                  Recipient Donation Requests for your Barangay
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">Start Date:</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="p-1 border rounded text-sm w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">End Date:</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="p-1 border rounded text-sm w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 whitespace-nowrap text-sm">Calamity Type:</span>
                    <select
                      value={calamityType}
                      onChange={(e) => setCalamityType(e.target.value)}
                      className="p-1 border rounded text-sm w-40"
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
                    className={`btn btn-primary ${!isPostButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    backgroundColor: hasSelectedRequests ? '#EF4444' : '#10B981',
                    transition: 'background-color 0.3s'
                  }}
                >
                  {hasSelectedRequests ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">Loading...</td>
            </tr>
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{request.completeName}</td>
                <td className="p-3 border-b">{request.area}</td>
                <td className="p-3 border-b">{request.typeOfCalamity}</td>
                <td className="p-3 border-b">
                  {request.inKindNecessities && typeof request.inKindNecessities === 'string'
                    ? request.inKindNecessities
                    : 'No necessities specified'
                  }
                </td>
                <td className="p-3 border-b">{new Date(request.dateTime).toLocaleDateString()}</td>
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
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedRequests.includes(request.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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
              <td colSpan={5} className="text-center p-4">No requests found.</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="p-4">
              <div className="flex justify-center items-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`btn btn-sm mx-1 ${
                      currentPage === index + 1
                        ? 'bg-green-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
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
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Request Details</h2>
            <div className="space-y-4">
              <p><span className="font-semibold">Name:</span> {selectedRequest.completeName}</p>
              <p><span className="font-semibold">Area:</span> {selectedRequest.area}</p>
              <p><span className="font-semibold">Calamity Type:</span> {selectedRequest.typeOfCalamity}</p>
              <p><span className="font-semibold">In-Kind Necessities:</span> {selectedRequest.inKindNecessities}</p>
              <p><span className="font-semibold">Specifications:</span> {selectedRequest.specifications}</p>
              <p><span className="font-semibold">Date:</span> {new Date(selectedRequest.dateTime).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="btn btn-primary"
              >
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
