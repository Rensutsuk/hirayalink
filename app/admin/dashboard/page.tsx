"use client";

import { ReactElement, useState, useEffect } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Function to fetch admin info from your backend
async function fetchAdminInfo() {
  const response = await fetch('/api/admin/info'); // Adjust this endpoint to match your API
  if (!response.ok) {
    throw new Error('Failed to fetch admin info');
  }
  return response.json();
}

export default function Dashboard(): ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ name: '', brgyNumber: '' });
  const router = useRouter();

  useEffect(() => {
    fetchAdminInfo()
      .then(data => setAdminInfo(data))
      .catch(error => console.error('Error fetching admin info:', error));
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      
      // Call your sign-out API endpoint
      const response = await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Sign out successful');
        
        // Clear any client-side authentication data
        localStorage.removeItem('adminToken'); // If you're using localStorage
        sessionStorage.clear(); // Clear any session storage
        
        // Clear any cookies (if you're using cookies for authentication)
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Force a hard reload of the page to clear any cached state
        window.location.href = '/';
      } else {
        console.error('Sign out failed');
        alert('Sign out failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('An error occurred during sign out. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-green-200 p-4 flex justify-between items-center">
        <div className="relative flex-grow max-w-2xl">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative flex items-center ml-4">
          <div className="text-right mr-2">
            <p className="font-semibold">{adminInfo.name}</p>
            <p className="text-sm text-gray-600">Brgy - {adminInfo.brgyNumber}</p>
          </div>
          <button 
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaChevronDown />
          </button>
          <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ${isDropdownOpen ? '' : 'hidden'}`}>
            <button 
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* Your existing dashboard content goes here */}
      </main>
    </div>
  );
}
