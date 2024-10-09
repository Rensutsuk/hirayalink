"use client";

import { ReactElement, useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface DonationRequest {
  id: string;
  requestDate: string;
  requesterName: string;
  inKindNecessities: string[];
  calamityType: string;
  barangay: string;
  description: string;
}

export default function Dashboard(): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([
    {
      id: "1",
      requestDate: "2023-05-01",
      requesterName: "John Doe",
      inKindNecessities: ["Food", "Clothes", "Water"],
      calamityType: "Typhoon",
      barangay: "Barangay 1",
      description: "Urgent need for supplies due to recent typhoon.",
    },
    {
      id: "2",
      requestDate: "2023-05-02",
      requesterName: "Jane Smith",
      inKindNecessities: ["Clothes", "Blankets", "Hygiene Kits"],
      calamityType: "Flood",
      barangay: "Barangay 2",
      description: "Families displaced by flood need immediate assistance.",
    },
    {
      id: "3",
      requestDate: "2023-05-03",
      requesterName: "Bob Johnson",
      inKindNecessities: ["Money", "Medical Supplies"],
      calamityType: "Earthquake",
      barangay: "Barangay 3",
      description: "Medical supplies needed for earthquake victims.",
    },
    {
      id: "4",
      requestDate: "2023-05-04",
      requesterName: "Alice Brown",
      inKindNecessities: ["Food", "Water", "Tents"],
      calamityType: "Drought",
      barangay: "Barangay 4",
      description: "Long-term drought affecting food and water supply.",
    },
    {
      id: "5",
      requestDate: "2023-05-05",
      requesterName: "Charlie Davis",
      inKindNecessities: ["Construction Materials", "Tools"],
      calamityType: "Typhoon",
      barangay: "Barangay 5",
      description: "Rebuilding homes after severe typhoon damage.",
    },
    {
      id: "6",
      requestDate: "2023-05-06",
      requesterName: "Eva Wilson",
      inKindNecessities: ["Food", "Clothes"],
      calamityType: "Flood",
      barangay: "Barangay 1",
      description: "Flood victims in need of basic necessities.",
    },
    {
      id: "7",
      requestDate: "2023-05-07",
      requesterName: "Frank Miller",
      inKindNecessities: ["Medical Supplies", "Hygiene Kits"],
      calamityType: "Earthquake",
      barangay: "Barangay 2",
      description:
        "Urgent medical assistance required for earthquake-affected areas.",
    },
    {
      id: "8",
      requestDate: "2023-05-08",
      requesterName: "Grace Taylor",
      inKindNecessities: ["Water", "Food"],
      calamityType: "Drought",
      barangay: "Barangay 3",
      description: "Severe drought causing food and water shortages.",
    },
    {
      id: "9",
      requestDate: "2023-05-09",
      requesterName: "Henry Clark",
      inKindNecessities: ["Tents", "Blankets"],
      calamityType: "Typhoon",
      barangay: "Barangay 4",
      description: "Temporary shelters needed for typhoon survivors.",
    },
    {
      id: "10",
      requestDate: "2023-05-10",
      requesterName: "Ivy Martinez",
      inKindNecessities: ["Money", "Food"],
      calamityType: "Flood",
      barangay: "Barangay 5",
      description:
        "Financial aid and food supplies for flood-affected families.",
    },
    {
      id: "11",
      requestDate: "2023-05-11",
      requesterName: "Jack Robinson",
      inKindNecessities: ["Construction Materials", "Tools"],
      calamityType: "Earthquake",
      barangay: "Barangay 1",
      description: "Rebuilding community structures after earthquake.",
    },
    {
      id: "12",
      requestDate: "2023-05-12",
      requesterName: "Karen Lee",
      inKindNecessities: ["Seeds", "Agricultural Tools"],
      calamityType: "Drought",
      barangay: "Barangay 2",
      description: "Support for farmers affected by prolonged drought.",
    },
    {
      id: "13",
      requestDate: "2023-05-13",
      requesterName: "Liam Harris",
      inKindNecessities: ["Clothes", "Hygiene Kits"],
      calamityType: "Typhoon",
      barangay: "Barangay 3",
      description: "Basic necessities for typhoon victims.",
    },
    {
      id: "14",
      requestDate: "2023-05-14",
      requesterName: "Mia Thompson",
      inKindNecessities: ["Water Purifiers", "Medicines"],
      calamityType: "Flood",
      barangay: "Barangay 4",
      description: "Clean water and medical supplies for flood-affected areas.",
    },
    {
      id: "15",
      requestDate: "2023-05-15",
      requesterName: "Noah Garcia",
      inKindNecessities: ["Food", "Blankets"],
      calamityType: "Earthquake",
      barangay: "Barangay 5",
      description: "Immediate relief for earthquake survivors.",
    },
    {
      id: "16",
      requestDate: "2023-05-16",
      requesterName: "Olivia Martin",
      inKindNecessities: ["Water Tanks", "Food"],
      calamityType: "Drought",
      barangay: "Barangay 1",
      description:
        "Water storage and food supplies for drought-affected community.",
    },
    {
      id: "17",
      requestDate: "2023-05-17",
      requesterName: "Peter White",
      inKindNecessities: ["Tents", "First Aid Kits"],
      calamityType: "Typhoon",
      barangay: "Barangay 2",
      description:
        "Emergency shelters and medical supplies for typhoon victims.",
    },
    {
      id: "18",
      requestDate: "2023-05-18",
      requesterName: "Quinn Adams",
      inKindNecessities: ["Sandbags", "Water Pumps"],
      calamityType: "Flood",
      barangay: "Barangay 3",
      description: "Flood control materials needed urgently.",
    },
    {
      id: "19",
      requestDate: "2023-05-19",
      requesterName: "Rachel Green",
      inKindNecessities: ["Construction Materials", "Heavy Equipment"],
      calamityType: "Earthquake",
      barangay: "Barangay 4",
      description:
        "Assistance in rebuilding infrastructure after major earthquake.",
    },
    {
      id: "20",
      requestDate: "2023-05-20",
      requesterName: "Samuel Baker",
      inKindNecessities: ["Irrigation Systems", "Drought-Resistant Seeds"],
      calamityType: "Drought",
      barangay: "Barangay 5",
      description: "Long-term solutions for drought-prone agricultural areas.",
    },
    // Additional requests with some in the same area
    {
      id: "21",
      requestDate: "2023-05-21",
      requesterName: "Tina Turner",
      inKindNecessities: ["Food", "Water", "Medicines"],
      calamityType: "Typhoon",
      barangay: "Barangay 1",
      description: "Urgent supplies needed for typhoon victims.",
    },
    {
      id: "22",
      requestDate: "2023-05-22",
      requesterName: "Uma Thurman",
      inKindNecessities: ["Blankets", "Warm Clothes"],
      calamityType: "Flood",
      barangay: "Barangay 2",
      description: "Winter supplies for flood-affected families.",
    },
    {
      id: "23",
      requestDate: "2023-05-23",
      requesterName: "Victor Hugo",
      inKindNecessities: ["Construction Materials", "Tools"],
      calamityType: "Earthquake",
      barangay: "Barangay 3",
      description: "Rebuilding homes after severe earthquake damage.",
    },
    {
      id: "24",
      requestDate: "2023-05-24",
      requesterName: "Wendy Williams",
      inKindNecessities: ["Water Purifiers", "Solar Lamps"],
      calamityType: "Drought",
      barangay: "Barangay 4",
      description: "Clean water and lighting for drought-affected areas.",
    },
    {
      id: "25",
      requestDate: "2023-05-25",
      requesterName: "Xavier Yates",
      inKindNecessities: ["Food", "Hygiene Kits"],
      calamityType: "Typhoon",
      barangay: "Barangay 5",
      description: "Basic necessities for families affected by typhoon.",
    },
    {
      id: "26",
      requestDate: "2023-05-26",
      requesterName: "Yvonne Zhang",
      inKindNecessities: ["Medical Supplies", "First Aid Kits"],
      calamityType: "Flood",
      barangay: "Barangay 1",
      description: "Medical assistance for flood victims.",
    },
    {
      id: "27",
      requestDate: "2023-05-27",
      requesterName: "Zack Brown",
      inKindNecessities: ["Tents", "Sleeping Bags"],
      calamityType: "Earthquake",
      barangay: "Barangay 2",
      description: "Temporary shelters for earthquake survivors.",
    },
    {
      id: "28",
      requestDate: "2023-05-28",
      requesterName: "Amy Adams",
      inKindNecessities: ["Seeds", "Farming Tools"],
      calamityType: "Drought",
      barangay: "Barangay 3",
      description: "Agricultural support for drought-affected farmers.",
    },
    {
      id: "29",
      requestDate: "2023-05-29",
      requesterName: "Ben Carson",
      inKindNecessities: ["Water", "Non-perishable Food"],
      calamityType: "Typhoon",
      barangay: "Barangay 4",
      description: "Essential supplies for typhoon-hit areas.",
    },
    {
      id: "30",
      requestDate: "2023-05-30",
      requesterName: "Cathy Davis",
      inKindNecessities: ["Clothes", "Shoes"],
      calamityType: "Flood",
      barangay: "Barangay 5",
      description: "Clothing assistance for flood victims.",
    },
  ]);

  const [calamityFilter, setCalamityFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] =
    useState<DonationRequest | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(
    new Set()
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  const filteredRequests = useMemo(() => {
    return donationRequests.filter(
      (request) =>
        (calamityFilter === "All" || request.calamityType === calamityFilter) &&
        (areaFilter === "All" || request.barangay === areaFilter)
    );
  }, [donationRequests, calamityFilter, areaFilter]);

  const paginatedRequests = useMemo(() => {
    return filteredRequests.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredRequests, currentPage, itemsPerPage]);

  useEffect(() => {
    setIsAllSelected(
      selectedRequests.size === paginatedRequests.length &&
        paginatedRequests.length > 0
    );
  }, [selectedRequests, paginatedRequests]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handleView = (request: DonationRequest) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleSelectRequest = (id: string) => {
    setSelectedRequests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRequests(new Set());
    } else {
      const allIds = new Set(paginatedRequests.map((request) => request.id));
      setSelectedRequests(allIds);
    }
  };

  const handlePost = () => {
    const selectedRequestsData = paginatedRequests.filter((request) =>
      selectedRequests.has(request.id)
    );

    if (selectedRequestsData.length > 0) {
      const necessities = new Set<string>();
      let calamityType = "";
      let area = "";

      selectedRequestsData.forEach((request) => {
        request.inKindNecessities.forEach((necessity) =>
          necessities.add(necessity)
        );
        if (!calamityType) calamityType = request.calamityType;
        if (!area) area = request.barangay.replace(/^Barangay \d+/, "Barangay");
      });

      const queryParams = new URLSearchParams({
        necessities: Array.from(necessities).join(","),
        area,
        calamityType,
      });

      router.push(`/admin/admin-request-donation?${queryParams.toString()}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Recipient In-Kind Donation Requests for your Barangay
          </h2>
          <div className="flex space-x-4 items-center">
            <select
              className="border rounded px-2 py-1"
              value={calamityFilter}
              onChange={(e) => setCalamityFilter(e.target.value)}
            >
              <option value="All">All Calamities</option>
              <option value="Typhoon">Typhoon</option>
              <option value="Flood">Flood</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Drought">Drought</option>
            </select>
            <select
              className="border rounded px-2 py-1"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              <option value="All">All Areas</option>
              <option value="Barangay">Barangay</option>
            </select>
            <button
              className={`px-4 py-2 rounded ${
                selectedRequests.size > 0
                  ? "bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out shadow-lg animate-pulse"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handlePost}
              disabled={selectedRequests.size === 0}
            >
              Post
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-600">
                  Request Date
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-600">
                  Requester Name
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-600">
                  In-Kind Necessities List
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-600">
                  Calamity Type
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-600">
                  Area
                </th>
                <th className="py-3 px-4 border-b"></th>
                <th className="py-3 px-4 border-b text-center font-semibold text-gray-600">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleSelectAll}
                  >
                    {isAllSelected ? "Deselect All" : "Select All"}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{request.requestDate}</td>
                  <td className="py-3 px-4 border-b">
                    {request.requesterName}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {request.inKindNecessities.join(", ")}
                  </td>
                  <td className="py-3 px-4 border-b">{request.calamityType}</td>
                  <td className="py-3 px-4 border-b">{request.barangay}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                      onClick={() => handleView(request)}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedRequests.has(request.id)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleSelectRequest(request.id)}
                    >
                      {selectedRequests.has(request.id) && (
                        <FaCheckCircle className="text-white" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <select
              className="border rounded px-2 py-1"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="ml-2">records/page</span>
          </div>
          <div className="flex items-center">
            <span className="mr-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 mr-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Request Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Request Date:</strong> {selectedRequest.requestDate}
              </p>
              <p>
                <strong>Requester Name:</strong> {selectedRequest.requesterName}
              </p>
              <p>
                <strong>In-Kind Necessities List:</strong>{" "}
                {selectedRequest.inKindNecessities.join(", ")}
              </p>
              <p>
                <strong>Calamity Type:</strong> {selectedRequest.calamityType}
              </p>
              <p>
                <strong>Barangay:</strong> {selectedRequest.barangay}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
