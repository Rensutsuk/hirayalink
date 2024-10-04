import { ReactElement } from 'react';

export default function Dashboard(): ReactElement {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Donations</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
          <p className="text-3xl font-bold">56</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">New Users</h2>
          <p className="text-3xl font-bold">78</p>
        </div>
      </div>
    </div>
  );
}
