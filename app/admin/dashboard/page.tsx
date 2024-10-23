"use client";

import DonationRequestsTable from "@/components/admin/dashboard/DonationRequestsTable";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="flex text-3xl font-bold">Admin Dashboard</h1>
      <div className="bg-primary rounded-lg mt-5">
        <h2 className="text-white text-xl font-bold p-5">
          Recipient Donation Requests for your Barangay
        </h2>
        <DonationRequestsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
