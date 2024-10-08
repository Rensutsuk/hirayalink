"use client";

import { ReactElement } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard(): ReactElement {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {session?.user && (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <p>You are managing {session.user.brgyName || "N/A"}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">Total Donation Requests</h3>
                <p className="text-2xl">0</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">Pending Approvals</h3>
                <p className="text-2xl">0</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">Completed Donations</h3>
                <p className="text-2xl">0</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <p>No recent activity to display.</p>
          </div>
        </div>
      )}
    </div>
  );
}
